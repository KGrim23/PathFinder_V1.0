"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar component
import Navbar from "../components/Navbar"; // Import Navbar component
import { TooltipProvider } from "@radix-ui/react-tooltip"; // Ensure the tooltip provider is wrapped around the components
import { useTheme } from "../components/ThemeContext"; // Import theme context for dark mode handling

// Define UserMessage type
export type UserMessage = {
  type: "user";
  content: string;
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

// Define AI Message type
export type AIMessage = {
  type: "ai";
  content:
    | {
        dialogue?: Array<{ speaker: string; message: string }>;
        steps?: Array<{ step_number: number; instruction: string }>;
        rawMessage?: string;
      }
    | string;
};

// Define the combined MessageType
export type MessageType = UserMessage | AIMessage;

const SavedChatsPage: React.FC = () => {
  const { isDarkMode } = useTheme(); // Get dark mode state from context
  const [savedChats, setSavedChats] = useState<MessageType[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false); // Track if it's mobile view

  // Load saved chats from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedChats");
    if (saved) {
      setSavedChats(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deleteAllChats = () => {
    setSavedChats([]); // Clear the state
    localStorage.removeItem("savedChats"); // Remove saved chats from localStorage
    alert("All chats have been deleted!"); // Optional feedback
  };

  // Function to render user messages
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

  // Function to render AI messages
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
    <TooltipProvider>
      <div
        className={`grid h-screen w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {!isMobile && <Sidebar isMobile={false} />} {/* Render sidebar */}
        <div className="flex flex-col h-full">
          {/* Render Navbar */}
          <Navbar isMobile={isMobile} />
          <main className="flex-1 overflow-auto p-4 flex flex-col">
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
                <div className="flex justify-end mt-4">
                  <button
                    className="mt-4 p-2 bg-rose-900 text-white rounded"
                    onClick={deleteAllChats}
                  >
                    Delete Chat
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SavedChatsPage;
