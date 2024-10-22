import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeContext";
import ChatInput from "./ChatInput";

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

// AI Message Type as AI response is more complicated than User Message
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
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleOptionClick,
  handleFeedback,
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

  // Save chat history to local storage
  const saveChatHistory = () => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
    alert("Chat history saved!");
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
          <div className="flex flex-wrap gap-2">
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
                className={`rounded-button ${isDarkMode ? "white-border" : ""}`}
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
      // Check for 'steps' array
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
      // Handle raw message if no structured data available
      return <p>{content.rawMessage || "No structured content available."}</p>;
    }

    // Handle string content
    if (typeof content === "string") {
      // If the string is in JSON format, parse it
      try {
        const parsedContent = JSON.parse(content);
        return renderAIMessageContent(parsedContent);
      } catch {
        // If parsing fails, return the raw string
        return <p>{content}</p>;
      }
    }

    // Fallback for any other types
    return <p>No valid content available.</p>;
  };

  const renderUserMessageContent = (content: string) => {
    // Split the content by new lines
    const lines = content.split("\n");

    return lines.map((line, index) => {
      // Check for bold text
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3 key={index} className="font-semibold text-lg mb-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      // Check for bullet points
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-2 list-disc">
            {line.replace(/^- /, "")}
          </li>
        );
      }
      // Check for numbered lists
      if (line.match(/^\d+\.\s/)) {
        return (
          <li key={index} className="ml-6 mb-2 list-decimal">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      }
      // Default to paragraph
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
              }`}
              style={{
                maxWidth: "100%", // Allow full width while preventing overflow
                width: "auto", // Set width to auto for dynamic sizing
                wordWrap: "break-word", // Enable word wrapping
                overflowWrap: "break-word", // Enable overflow wrapping
              }}
            >
              <div className="text-md leading-relaxed break-all">
                {" "}
                {/* Added break-all */}
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

      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleMessageSend}
      />
    </div>
  );
};

export default ChatInterface;
