import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); //? Load environment variables from .env.local file before importing other modules
import { getEmbeddingsCollection, getVectorStore } from "../src/lib/db/astradb";
import { DocumentInterface } from "@langchain/core/documents";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Redis } from "@upstash/redis";
import path from "path";

(async () => {
  await Redis.fromEnv().flushdb(); // Clear the Redis cache

  const vectorStore = await getVectorStore();

  // Clear the collection before inserting new documents
  try {
    await (await getEmbeddingsCollection()).deleteMany({});
  } catch (error) {
    console.log("Collection doesn't exist yet, creating it...");
  }

  const loader = new DirectoryLoader(
    "src/app/",
    {
      ".tsx": (path) => new TextLoader(path),
    },
    true, // recursive folder loading
  );
  try {
    const docs = (await loader.load())
      .filter((doc: DocumentInterface) =>
        (doc.metadata.source as string).endsWith("page.tsx"),
      )
      .map((doc: DocumentInterface) => {
        const url =
          (doc.metadata.source as string)
            .replace(/\\/g, "/")
            .split("/src/app")[1]
            .split("/page.")[0] || "/"; // e.g. /about/page.tsx -> /about

        const pageContentTrimmed = doc.pageContent
          .replace(/^import.*$/gm, "") // Remove import statements
          .replace(/ className=(["']).*?\1| className={.*?}/g, "") // Remove className attributes
          .replace(/^\s*[\r]/gm, "") // Remove empty lines
          .trim();

        return {
          pageContent: pageContentTrimmed,
          metadata: {
            url,
          },
        };
      });
    const splitter = RecursiveCharacterTextSplitter.fromLanguage("html");
    const splitDocs = await splitter.splitDocuments(docs);
    await vectorStore.addDocuments(splitDocs);

    // Process PDF resume
    console.log("Processing PDF resume...");
    const resumePath = path.join(
      process.cwd(),
      "public",
      "Mohammad_Farhadi_Frontend_Resume.pdf",
    );

    try {
      const pdfLoader = new PDFLoader(resumePath);
      const resumeDocs = await pdfLoader.load();

      // Process resume documents with specific metadata
      const processedResumeDocs = resumeDocs.map((doc: DocumentInterface) => ({
        pageContent: doc.pageContent,
        metadata: {
          source: "resume",
          type: "pdf",
          title: "Mohammad Farhadi Resume",
          url: "/resume",
        },
      }));

      // Split resume content for better embedding
      const resumeSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const splitResumeDocs =
        await resumeSplitter.splitDocuments(processedResumeDocs);
      await vectorStore.addDocuments(splitResumeDocs);

      console.log(
        `Successfully processed resume with ${splitResumeDocs.length} chunks`,
      );
    } catch (resumeError) {
      console.error("Error processing PDF resume:", resumeError);
    }
  } catch (error) {
    console.error("Error generating embeddings:", error);
  }
})();
