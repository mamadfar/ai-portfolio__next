import { OpenAIEmbeddings } from "@langchain/openai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { Document } from "@langchain/core/documents";
import { BaseRetriever, type BaseRetrieverInterface } from "@langchain/core/retrievers";

const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";

if (!endpoint || !token || !collection) {
  throw new Error(
    "Astra DB configuration is missing. Please check your environment variables.",
  );
}

// Define a custom Retriever class
export class AstraDbRetriever extends BaseRetriever implements BaseRetrieverInterface {
  lc_namespace = ["langchain", "retrievers", "astradb"];

  private vectorStore: {
    similaritySearch: (query: string, k: number) => Promise<Document[]>;
  };
  private k: number;

  constructor(
    vectorStore: {
      similaritySearch: (query: string, k: number) => Promise<Document[]>;
    },
    options?: { k?: number },
  ) {
    super();
    this.vectorStore = vectorStore;
    this.k = options?.k ?? 4;
  }

  async _getRelevantDocuments(query: string): Promise<Document[]> {
    return this.vectorStore.similaritySearch(query, this.k);
  }
}

// Create a compatibility wrapper that mimics AstraDBVectorStore
export const getVectorStore = async () => {
  try {
    console.log("[ASTRA] Initializing AstraDB connection...");
    
    const client = new DataAPIClient(token);
    const db = client.db(endpoint);
    const coll = db.collection(collection);
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    // Check if collection exists, if not create it
    try {
      await coll.options();
      console.log("[ASTRA] Collection exists, proceeding...");
    } catch (collError) {
      console.log("[ASTRA] Collection doesn't exist, creating...");
      await db.createCollection(collection, {
        vector: {
          dimension: 1536,
          metric: "cosine",
        },
      });
      console.log("[ASTRA] Collection created successfully");
    }
  const vectorStore = {
    async addDocuments(documents: Array<{ pageContent: string; metadata?: unknown }>) {
      const docsWithEmbeddings = await Promise.all(
        documents.map(async (doc) => {
          const embedding = await embeddings.embedDocuments([doc.pageContent]);
          return {
            text: doc.pageContent,
            metadata: doc.metadata || {},
            $vector: embedding[0],
          };
        })
      );
      
      return await coll.insertMany(docsWithEmbeddings);
    },

    async similaritySearch(query: string, k: number = 4) {
      try {
        const queryEmbedding = await embeddings.embedQuery(query);
        
        const cursor = coll.find(
          {},
          {
            sort: { $vector: queryEmbedding },
            limit: k,
            includeSimilarity: true,
          }
        );
        
        const results = await cursor.toArray();
        return results.map(doc => new Document({
          pageContent: doc.text || doc.content || "",
          metadata: doc.metadata || {},
        }));
      } catch (searchError) {
        console.error("[ASTRA] Similarity search failed:", searchError);
        throw new Error(`Vector search failed: ${searchError instanceof Error ? searchError.message : 'Unknown error'}`);
      }
    },

    asRetriever(options?: { k?: number }) {
      const k = options?.k || 4; //* Default number of documents to retrieve
      
      // Return an instance of the custom retriever
      return new AstraDbRetriever(vectorStore, { k });
    }
  };

  console.log("[ASTRA] Vector store initialized successfully");
  return vectorStore;
  
  } catch (error) {
    console.error("[ASTRA] Failed to initialize vector store:", error);
    throw new Error(`AstraDB initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getEmbeddingsCollection = async () => {
  const client = new DataAPIClient(token);
  return client.db(endpoint).collection(collection);
};
