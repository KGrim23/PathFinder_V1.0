"use client";

import React from "react";
import { ThumbsUp, ThumbsDown, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatInput } from "./ChatInput";
import { useTheme } from "./ThemeContext";

type MessageType = {
  type: "user" | "ai";
  content: string;
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

type ChatInterfaceProps = {
  messages: MessageType[];
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
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

  const renderMessageContent = (content: string) => {
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
      } else {
        return (
          <p key={index} className="mb-2 last:mb-0">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div
      className={`flex flex-col h-full ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
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
      <div className="flex-1 overflow-auto mb-4">
        <Badge
          variant="outline"
          className={`mb-2 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Chat
        </Badge>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : isDarkMode
                  ? "bg-black"
                  : "bg-muted"
              } shadow-md transition-transform`}
              style={{
                maxWidth: "80%",
                wordWrap: "break-word",
              }}
            >
              <div className="text-md leading-relaxed">
                {renderMessageContent(message.content)}
              </div>
            </div>
            {message.type === "ai" && (
              <div className="mt-2 flex items-center space-x-2">
                <Button
                  variant={message.feedback?.liked ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback(index, "liked")}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button
                  variant={message.feedback?.disliked ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback(index, "disliked")}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
                <Button
                  variant={message.feedback?.sound ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleFeedback(index, "sound")}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatInterface;
