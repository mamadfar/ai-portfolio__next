import { NextRequest, NextResponse } from "next/server";
import { LangChainAdapter } from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { getVectorStore } from "@/lib/db/astradb";
import { createRetrievalChain } from "langchain/chains/retrieval";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { messages } = body;

    const currentMessageContent = messages[messages.length - 1]?.content;

    const chatModel = new ChatOpenAI({
      model: "gpt-4-turbo",
      streaming: true, //* It will send the response piece by piece as it generates them, if we set it to false, it will send the whole response at once.
      temperature: 0.7, //* 0 means the model will give you the same answer every time, and higher values like 0.7 will make the model more creative and diverse in its responses.
      verbose: true, //* If set to true, it will log the model's responses to the console.
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a chatbot for a personal portfolio website. You impersonate the website's owner and answer questions about the website's content, projects, and personal information. " +
          "Answer the user's questions based on the below context. " +
          "Whenever it makes sense, provide links to pages that contain more information about the topic from the given context. " +
          "Format your messages in markdown format.\n\n" +
          "Context:\n{context}",
      ],
      ["user", "{input}"],
    ]);
    const combineDocsChain = await createStuffDocumentsChain({ //* Create documents and put them in the {context} of the prompt
        llm: chatModel,
        prompt
    })

    const retriever = (await getVectorStore()).asRetriever();
        const retrievalChain = await createRetrievalChain({
        combineDocsChain,
        retriever,
    });

    const stream = await retrievalChain.stream({
      input: currentMessageContent,
    });

    // Transform the retrieval chain stream to match LangChainAdapter expectations
    const transformedStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.answer) {
              controller.enqueue(chunk.answer);
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return LangChainAdapter.toDataStreamResponse(transformedStream);
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

//! POST request to the openai endpoint.
// export const POST = async (req: NextRequest) => {
//   try {
//     const body = await req.json();
//     const { messages } = body;

//     //? If we wanna configure OpenAI with an API key, we can do it like this:
//     // const apiKey = process.env.OPENAI_API_KEY; // We can ignore this line if we want, cause OpenAI will check the environment variable automatically and look for the key.

//     // const openai = createOpenAI({
//     //   apiKey: apiKey,
//     // });

//     const systemMessage = {
//       role: "system" as const,
//       content:
//         "You are a sarcasm Bot. You answer all user questions in a sarcastic way",
//     };

//     const response = streamText({
//       model: openai("gpt-4-turbo"),
//       messages: [systemMessage, ...messages],
//       maxTokens: 1000,
//     });

//     return response.toDataStreamResponse();
//   } catch (error) {
//     console.error("Error in POST /api/chat:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// };
