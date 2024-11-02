"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useTheme } from "../components/ThemeContext";

export type UserMessage = {
  type: "user";
  content: string;
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

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

export type MessageType = UserMessage | AIMessage;

const SavedChatsPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [savedChats, setSavedChats] = useState<MessageType[][]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Load saved chats from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chatSessions");
    if (saved) {
      try {
        const parsedSavedChats = JSON.parse(saved);
        if (Array.isArray(parsedSavedChats)) {
          setSavedChats(parsedSavedChats);
        }
      } catch (error) {
        console.error("Failed to parse saved chats:", error);
      }
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
    setSavedChats([]);
    localStorage.removeItem("chatSessions");
    alert("All chats have been deleted!");
  };

  const deleteChatSession = (chatIndex: number) => {
    const updatedChats = savedChats.filter((_, index) => index !== chatIndex);
    setSavedChats(updatedChats);
    localStorage.setItem("chatSessions", JSON.stringify(updatedChats));
    alert(`Chat Session ${chatIndex + 1} has been deleted!`);
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

  const renderAIMessageContent = (content: any) => {
    if (typeof content === "string") {
      try {
        const parsedContent = JSON.parse(content);
        content = parsedContent;
      } catch {
        return <p>{content}</p>;
      }
    }

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
                (step: { step_number: number; instruction: string }) => (
                  <li key={step.step_number}>
                    {step.instruction.replace(/\*/g, "").trim()}
                  </li>
                )
              )}
            </ul>
          </div>
        );
      }
      if (content.rawMessage) {
        return <p>{content.rawMessage}</p>;
      }
    }

    return <p>No valid content available.</p>;
  };

  const handleChatClick = (index: number) => {
    setSelectedChatIndex(selectedChatIndex === index ? null : index);
  };

  return (
    <TooltipProvider>
      <div
        className={`grid h-screen w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {!isMobile && <Sidebar isMobile={false} />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />
          <main className="flex-1 overflow-auto p-4 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Saved Chats</h2>
            {savedChats.length === 0 ? (
              <p>No saved chats found.</p>
            ) : (
              <div className="gap-4 flex flex-col">
                {savedChats.map((chat, chatIndex) => (
                  <div
                    key={chatIndex}
                    className={`p-4 rounded-xl justify-center items-center ${
                      isDarkMode ? "bg-zinc-950" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div
                        className={`cursor-pointer ${
                          selectedChatIndex === chatIndex ? "font-bold" : ""
                        }`}
                        onClick={() => handleChatClick(chatIndex)}
                      >
                        Session {chatIndex + 1}
                      </div>
                      <button
                        className={`ml-4 ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                        onClick={() => deleteChatSession(chatIndex)}
                      >
                        Delete
                      </button>
                    </div>
                    {selectedChatIndex === chatIndex && (
                      <div className="space-y-4">
                        {chat.map((message, messageIndex) => (
                          <div
                            key={messageIndex}
                            className={`inline-block p-3 rounded-xl w-full ${
                              message.type === "user"
                                ? "text-black text-right"
                                : "text-black text-left"
                            }`}
                          >
                            <div className="text-md leading-relaxed">
                              {message.type === "user"
                                ? renderUserMessageContent(message.content)
                                : renderAIMessageContent(message.content)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex justify-end mt-24">
                  <button
                    className={`ml-auto gap-1.5 text-white ${
                      isDarkMode
                        ? "bg-black text-white border-2 border-white"
                        : "bg-black"
                    } rounded-full px-3.5 py-2`}
                    onClick={deleteAllChats}
                  >
                    Delete All Chats
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
