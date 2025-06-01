"use client";

import { FC, useEffect, useRef } from "react";
import { Message, useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils/TailwindMerge";
import { Bot, SendHorizonal, Trash, XCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface IAIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

const AIChatBox: FC<IAIChatBoxProps> = ({ open, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    status,
    error,
  } = useChat();

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

    useEffect(() => {
        if (open) {
        inputRef.current?.focus();
        }
    }, [open]);

  return (
    <div
      className={cn(
        "right-0 bottom-0 z-50 w-full max-w-[500px] p-1 xl:right-36",
        open ? "fixed" : "hidden",
      )}
    >
      <button onClick={onClose} className="ms-auto mb-1 block cursor-pointer">
        <XCircle size={30} className="bg-background rounded-full" />
      </button>
      <div className="bg-background flex h-[600px] flex-col rounded-md border shadow-xl">
        <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {status === "submitted" && lastMessageIsUser && (
            <ChatMessage
              message={{
                id: "streaming",
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                id: "error",
                role: "assistant",
                content: "Something went wrong. Please try again.",
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="mx-8 flex h-full flex-col items-center justify-center gap-3 text-center">
              <Bot size={28} />
              <p className="text-lg font-medium">
                Send a message to start the AI chat.
              </p>
              <p className="text-muted-foreground text-sm">
                You can ask the chatbot any question about me and it will find
                the relevant information on this website.
              </p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <button
            type="button"
            title="Clear chat"
            onClick={() => setMessages([])}
            className="flex w-10 flex-none cursor-pointer items-center justify-center"
          >
            <Trash size={24} className="text-muted-foreground" />
          </button>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            className="bg-background grow rounded-md border px-3 py-2"
            ref={inputRef}
          />
          <button
            type="submit"
            disabled={status === "submitted" || input.length === 0}
            title="Submit message"
            className="flex w-10 flex-none cursor-pointer items-center justify-center disabled:opacity-50"
          >
            <SendHorizonal size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChatBox;

//* Internal Components

interface IChatMessageProps {
  message: Message;
}

const ChatMessage: FC<IChatMessageProps> = ({ message: { role, content } }) => {
  const isAiMessage = role === "assistant";
  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAiMessage && <Bot className="mr-2 flex-none" />}
      <div
        className={cn(
          "rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-foreground text-background",
        )}
      >
        <ReactMarkdown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ""}
                className="text-primary hover:underline"
              />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="mt-3 first:mt-0" />
            ),
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-3 list-inside list-disc first:mt-0"
              />
            ),
            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
