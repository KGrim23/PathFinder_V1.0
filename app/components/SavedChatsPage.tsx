"use client";
import React, { useEffect, useState } from "react";

// Define MessageType if not already defined in a shared file
export type UserMessage = {
  type: "user";
  content: string; // Only a string for user messages
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

// AI Message Type
export type AIMessage = {
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
export type MessageType = UserMessage | AIMessage;

const SavedChatsPage: React.FC = () => {
  const [savedChats, setSavedChats] = useState<MessageType[]>([]); // Specify the type for savedChats

  useEffect(() => {
    const saved = localStorage.getItem("savedChats");
    if (saved) {
      setSavedChats(JSON.parse(saved));
    }
  }, []);

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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Chats</h2>
      {savedChats.length === 0 ? (
        <p>No saved chats found.</p>
      ) : (
        <div>
          {savedChats.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.type === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-xl shadow-md transition-transform ${
                  message.type === "user"
                    ? "bg-blue-200 text-black"
                    : "bg-black text-white"
                }`}
                style={{
                  maxWidth: "95%",
                  wordWrap: "break-word",
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
        </div>
      )}
    </div>
  );
};

export default SavedChatsPage;
