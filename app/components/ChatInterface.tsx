"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeContext";
import ChatInput from "./ChatInput";
import { Import } from "lucide-react";

// User Message Type
type UserMessage = {
  type: "user";
  content: string; // Only a string for user messages
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

// AI Message Type
type AIMessage = {
  type: "ai";
  content:
    | {
        dialogue?: Array<{ speaker: string; message: string }>;
        steps?: Array<{ step_number: number; instruction: string }>;
        rawMessage?: string; // Fallback for unstructured content
      }
    | string; // Allow raw message string as a fallback
};

// Combined Message Type
type MessageType = UserMessage | AIMessage;

type ChatInterfaceProps = {
  messages: MessageType[];
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleOptionClick: (option: string) => void;
  handleFeedback: (index: number, type: "liked" | "disliked" | "sound") => void;
  saveChatHistory: () => void; // Add saveChatHistory prop here
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleOptionClick,
  handleFeedback,
  saveChatHistory, // Receive saveChatHistory here
}) => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setInputMessage("");
    await handleSendMessage(e);
    setIsLoading(false);
  };

  const renderOptions = () => {
    if (messages.length === 0) {
      return (
        <div
          className={`mb-2 rounded-lg p-4 ${
            isDarkMode ? "bg-black" : "bg-muted"
          }`}
        >
          <h2 className="mb-6 text-lg font-semibold">
            How can I assist you today?
          </h2>
          <div className="flex flex-wrap gap-2 items-center justify-self-auto">
            {[
              "Emotional Support",
              "Career Advice",
              "Personal Growth",
              "Stress Management",
              "Time Management",
              "Work-Life Balance",
            ].map((option) => (
              <Button
                key={option}
                variant="outline"
                size="sm"
                className={`rounded-full items-center ${
                  isDarkMode ? "white-border" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <span className="mr-2">
                  {option === "Emotional Support"
                    ? "💬"
                    : option === "Career Advice"
                    ? "🎯"
                    : option === "Personal Growth"
                    ? "🌱"
                    : option === "Stress Management"
                    ? "🧘"
                    : option === "Time Management"
                    ? "⏳"
                    : "⚖️"}
                </span>
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderAIMessageContent = (content: any) => {
    if (typeof content === "object" && content !== null) {
      if (content.dialogue && Array.isArray(content.dialogue)) {
        return (
          <div>
            {content.dialogue.map(
              (msg: { speaker: string; message: string }, index: number) => (
                <div key={index} className="mb-2">
                  {msg.message}
                </div>
              )
            )}
          </div>
        );
      }
      if (content.steps && Array.isArray(content.steps)) {
        return (
          <div className="mt-4">
            <ul className="ml-6 list-disc">
              {content.steps.map(
                (
                  step: { step_number: number; instruction: string },
                  index: number
                ) => (
                  <li key={step.step_number}>
                    {step.instruction.replace(/\*/g, "").trim()}
                  </li>
                )
              )}
            </ul>
          </div>
        );
      }
      return <p>{content.rawMessage || "No structured content available."}</p>;
    }

    if (typeof content === "string") {
      try {
        const parsedContent = JSON.parse(content);
        return renderAIMessageContent(parsedContent);
      } catch {
        return <p>{content}</p>;
      }
    }

    return <p>No valid content available.</p>;
  };

  const renderUserMessageContent = (content: string) => {
    const lines = content.split("\n");

    return lines.map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3 key={index} className="font-semibold text-lg mb-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-2 list-disc">
            {line.replace(/^- /, "")}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <li key={index} className="ml-6 mb-2 list-decimal">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      }
      return (
        <p key={index} className="mb-2 last:mb-0">
          {line}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex flex-col h-full ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {renderOptions()}
      <div className="flex-1 overflow-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-xl transition-transform ${
                message.type === "user"
                  ? isDarkMode
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  : isDarkMode
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } max-w-[90%] break-words overflow-wrap word-break`}
              style={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              <div className="text-md leading-relaxed">
                {message.type === "user"
                  ? renderUserMessageContent(message.content)
                  : renderAIMessageContent(message.content)}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-center mt-4">
            <p className="text-lg">Loading...</p>
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="flex justify-end p-3 mt-8">
          <button
            onClick={saveChatHistory}
            className="bg-black border-2 border-white text-white rounded px-4 py-1"
          >
            <Import className="dark:text-white" />
          </button>
        </div>
      )}

      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleMessageSend}
      />
    </div>
  );
};

export default ChatInterface;
