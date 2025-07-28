import { NextRequest, NextResponse } from "next/server";
import { LangChainAdapter, Message as VercelChatMessage } from "ai";
import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { getVectorStore } from "@/lib/db/astradb";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
// import { UpstashRedisCache } from "@langchain/community/caches/upstash_redis";
import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

// const cache = new UpstashRedisCache({
//   client: Redis.fromEnv(), //* Initialize the Upstash Redis cache using environment variables for connection details
// });

export const POST = async (req: NextRequest) => {
  try {
    console.log("[API] POST /api/chat - Request received");
    
    const body = await req.json();
    const { messages } = body;

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error("[API] Invalid messages array:", messages);
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    /**
     * Explain: This code processes the chat messages sent to the API endpoint. It extracts the chat history and the current user input message, which will be used to generate a response from the AI model.
     * The chat history is created by taking all messages except the last one (which is the current user input) and converting them into LangChain message objects (HumanMessage for user messages and AIMessage for AI responses).
     */
    const chatHistory = messages
      .slice(0, -1) //* Exclude the last message which is the current user input (currentMessageContent)
      .map((message: VercelChatMessage) =>
        message.role === "user"
          ? new HumanMessage(message.content)
          : new AIMessage(message.content),
      );
    const currentMessageContent = messages[messages.length - 1]?.content;

    if (!currentMessageContent?.trim()) {
      console.error("[API] Empty message content");
      return NextResponse.json(
        { error: "Message content cannot be empty" },
        { status: 400 }
      );
    }

    // Create a cache key based on ONLY the current message for simple caching
    // This ensures the same question always gets the same cached response
    const normalizedInput = currentMessageContent?.trim();

    const cachePayload = {
      input: normalizedInput,
    };

    const cacheKey = createHash("sha256")
      .update(JSON.stringify(cachePayload))
      .digest("hex"); 
    
    // Check if we have a cached response with error handling
    console.log(`[CACHE] Checking cache for key: ${cacheKey.substring(0, 8)}...`);
    let redis: Redis | null = null;
    let cachedResponse: string | null = null;
    
    try {
      redis = Redis.fromEnv();
      cachedResponse = await redis.get(`chat_response:${cacheKey}`);
      
      if (cachedResponse) {
        console.log(`[CACHE HIT] Returning cached response for key: ${cacheKey.substring(0, 8)}...`);
        // Return cached response as a stream
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(cachedResponse as string);
            controller.close();
          },
        });
        return LangChainAdapter.toDataStreamResponse(stream);
      }
    } catch (cacheError) {
      console.warn("[CACHE ERROR] Failed to access cache, proceeding without cache:", cacheError);
      // Continue without cache if Redis is unavailable
      redis = null;
    }

    console.log(
      `[CACHE MISS] Processing new request for key: ${cacheKey.substring(0, 8)}...`,
    );

    // Initialize chat model with error handling
    let chatModel;
    try {
      chatModel = new ChatOpenAI({
        model: "gpt-4-turbo",
        streaming: true, //* It will send the response piece by piece as it generates them, if we set it to false, it will send the whole response at once.
        /* temperature: 0.7, */ //* 0 means the model will give you the same answer every time, and higher values like 0.7 will make the model more creative and diverse in its responses.
        /* verbose: true, */ //* If set to true, it will log the model's responses to the console.
        // cache, //* Enable caching to speed up response generation for repeated queries, it will store the responses in memory and return them instantly if the same query is made again.
      });
      console.log("[AI] ChatOpenAI model initialized successfully");
    } catch (modelError) {
      console.error("[AI] Failed to initialize ChatOpenAI model:", modelError);
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please check your OpenAI API key and quota." },
        { status: 503 }
      );
    }

    /**
     * Explain: This code initializes the chat model using the ChatOpenAI class from LangChain, which allows us to interact with OpenAI's GPT-4 model. The model is configured to stream responses, have a temperature setting for creativity, and can be set to verbose mode for debugging purposes.
     * The chat model will be used to generate responses based on the user's input and the context provided by the retrieved documents.
     */
    let retriever;
    try {
      console.log("[DB] Initializing vector store retriever...");
      retriever = (await getVectorStore()).asRetriever({ k: 8 });
      console.log("[DB] Vector store retriever initialized successfully");
    } catch (dbError) {
      console.error("[DB] Failed to initialize vector store:", dbError);
      return NextResponse.json(
        { error: "Database service temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    /**
     * Explain: This code creates a prompt template for rephrasing the user input into a search query. It uses the MessagesPlaceholder to include the chat history in the chain, allowing the model to consider previous messages when generating the search query.
     */
    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"), //* This will be replaced with the chat history in the chain
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. " +
          "Don't leave out any relevant keywords. Only return the query and no other text.",
      ],
    ]);

    /**
     * Explain: This code creates a history-aware retriever chain that uses the chat model and the retriever to rephrase the user input into a search query. This allows the model to consider the context of the conversation when generating the search query.
     */
    const historyAwareRetrieverChain = await createHistoryAwareRetriever({
      llm: chatModel,
      retriever,
      rephrasePrompt, //* This prompt will be used to rephrase the user input into a search query
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a chatbot for a personal portfolio website. You impersonate the website's owner and answer questions about the website's content, projects, and personal information. " +
          "Check the all the pages of the website to find the answer to the user's question. " +
          "You are the owner of the website and you know everything about it. " +
          "If you don't know the answer, say 'I don't know' + " +
          "and don't make up any information. " +
          "Don not say I'm a robot or chatbot, you are the owner, you should now every single word in the pages and the context" +
          "You should not answer any question that is not related to the website's content, projects, and personal information. " +
          "The context separated by '-------------------------------' is the content of the website's pages. " +
          "The context separated in different chunks, check all the pages and chunks to find the answer to the user's question. " +
          "Again, search carefully for the information every where in the context, and your name is Mohammad Farhadi" +
          "Answer the user's questions based on the below context. " +
          "Whenever it makes sense, provide links to pages that contain more information about the topic from the given context. " +
          "If someone asked about my resume, they refer to my Mohammad_Farhadi_Frontend_Resume.pdf, so give them the link to the /Mohammad_Farhadi_Frontend_Resume.pdf" +
          "Format your messages in markdown format.\n\n" +
          "Context:\n{context}",
      ],
      new MessagesPlaceholder("chat_history"), //* This will be replaced with the chat history in the chain
      ["user", "{input}"],
    ]);

    /**
     * Explain: This code creates a document chain that combines multiple documents into a single context for the chat model.
     */
    const combineDocsChain = await createStuffDocumentsChain({
      //* Create documents and put them in the {context} of the prompt
      llm: chatModel,
      prompt,
      documentPrompt: PromptTemplate.fromTemplate(
        "Page URL: {url}\n\nPage content:\n{page_content}",
      ), //* The url comes from metadata: {url} in the generate.ts file, it should be the same name
      documentSeparator: "\n-------------------------------\n", //* This is the separator between documents in the context, it can make the context more readable by separating different documents.
    });

    const retrievalChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetrieverChain,
    }); /**
     * Explain: This code creates a stream from the retrieval chain and caches the complete response while streaming.
     */
    const stream = await retrievalChain.stream({
      input: currentMessageContent,
      chat_history: chatHistory, //* This is the chat history that will be used to generate the context for the current user input
    }); /**
     * Explain: This code transforms the retrieval chain stream, collects the complete response for caching,
     * and streams it to the client simultaneously for the best of both worlds.
     */
    let completeResponse = "";
    const transformedStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.answer) {
              completeResponse += chunk.answer;
              controller.enqueue(chunk.answer);
            }
          }
          // Cache the complete response for future requests
          if (completeResponse && redis) {
            try {
              await redis.set(`chat_response:${cacheKey}`, completeResponse, {
                ex: 3600,
              }); //? Cache for 1 hour
              console.log(`[CACHE] Response cached successfully for key: ${cacheKey.substring(0, 8)}...`);
            } catch (cacheError) {
              console.warn("[CACHE ERROR] Failed to cache response:", cacheError);
              // Don't fail the request if caching fails
            }
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return LangChainAdapter.toDataStreamResponse(transformedStream);
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    
    // Log more specific error information
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      if (error.stack) {
        console.error("Error stack:", error.stack);
      }
    }
    
    // Return more specific error messages based on error type
    let errorMessage = "Internal Server Error";
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes("rate limit") || error.message.includes("quota")) {
        errorMessage = "AI service rate limit exceeded. Please try again in a few minutes.";
        statusCode = 429;
      } else if (error.message.includes("API key") || error.message.includes("authentication")) {
        errorMessage = "AI service authentication failed. Please try again later.";
        statusCode = 503;
      } else if (error.message.includes("timeout") || error.message.includes("network")) {
        errorMessage = "Service temporarily unavailable. Please try again.";
        statusCode = 503;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode },
    );
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
