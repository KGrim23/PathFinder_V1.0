"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeContext";
import ChatInput from "./ChatInput";
import { Import, Volume2 } from "lucide-react"; // Import the audio icon

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
  saveChatHistory: () => void;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleOptionClick,
  handleFeedback,
  saveChatHistory,
}) => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUtterance, setCurrentUtterance] =
    useState<SpeechSynthesisUtterance | null>(null);

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setInputMessage("");
    await handleSendMessage(e);
    setIsLoading(false);
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

  const handleReadAloud = (content: any) => {
    let textToRead = "";

    if (typeof content === "object" && content !== null) {
      if (content.dialogue && Array.isArray(content.dialogue)) {
        // Get only the message text from dialogue without speaker info
        textToRead = content.dialogue
          .map((msg: { message: any }) => msg.message)
          .join(" ");
      } else if (content.steps && Array.isArray(content.steps)) {
        // Get only the instructions without step numbers
        textToRead = content.steps
          .map((step: { instruction: any }) => step.instruction)
          .join(" ");
      } else if (content.rawMessage) {
        // Use rawMessage if available
        textToRead = content.rawMessage;
      }
    } else if (typeof content === "string") {
      try {
        // Try to parse JSON string
        const parsed = JSON.parse(content);
        if (parsed.dialogue) {
          textToRead = parsed.dialogue
            .map((msg: { message: string }) => msg.message)
            .join(" ");
        } else if (parsed.steps) {
          textToRead = parsed.steps
            .map((step: { instruction: string }) => step.instruction)
            .join(" ");
        } else if (parsed.rawMessage) {
          textToRead = parsed.rawMessage;
        }
      } catch {
        // If not JSON, use the string directly
        textToRead = content;
      }
    }

    // Clean up the text
    textToRead = textToRead
      .replace(/\*\*/g, "")
      .replace(/\n/g, " ")
      .replace(/Assistant:|Human:|Speaker:|Dialog:|^\s*-\s*/gim, "")
      .replace(/\s+/g, " ")
      .trim();

    if (currentUtterance && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setCurrentUtterance(null);
    } else if (textToRead) {
      const utterance = new SpeechSynthesisUtterance(textToRead);
      setCurrentUtterance(utterance);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className={`flex flex-col h-full ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
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
                {message.type === "user" ? (
                  renderUserMessageContent(message.content)
                ) : (
                  <div className="flex flex-row items-end">
                    {renderAIMessageContent(message.content)}
                    <button
                      onClick={() => handleReadAloud(message.content)}
                      className="ml-2"
                    >
                      <Volume2
                        className={`border-2 rounded-full p-1 ${
                          isDarkMode
                            ? "text-gray-200 border-white hover:bg-gray-600"
                            : "text-black border-black hover:bg-gray-300"
                        }`}
                      />
                    </button>
                  </div>
                )}
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
            className={`flex items-center font-normal py-2 px-4 rounded-xl transition-colors duration-200
            focus:ring-2 focus:ring-offset-2 ${
              isDarkMode
                ? "focus:ring-gray-600 focus:ring-offset-gray-800"
                : "focus:ring-gray-300 focus:ring-offset-white"
            }`}
          >
            <Import className="mr-2" />
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
