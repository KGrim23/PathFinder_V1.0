import React from "react";
import { ThumbsUp, ThumbsDown, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { ChatInput } from "../components/ChatInput";

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

export default function ChatInterface({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleOptionClick,
  handleFeedback,
}: ChatInterfaceProps) {
  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      // Check for headings
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3 key={index} className="font-semibold text-lg mb-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      // Trying to format the output message from api to be more readable
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
    <div className="flex flex-col h-full">
      <div className="mb-4 rounded-lg bg-muted p-4">
        <h2 className="mb-2 text-lg font-semibold">
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
        <Badge variant="outline" className="mb-2">
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
                  : "bg-muted"
              } shadow-md transition-transform`}
              style={{
                maxWidth: "80%",
                wordWrap: "break-word",
              }}
            >
              <div className="text-sm leading-relaxed">
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
}
