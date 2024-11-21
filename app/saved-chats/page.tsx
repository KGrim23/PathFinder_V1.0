"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useTheme } from "../components/ThemeContext";
import { marked } from "marked";

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

  const formatAIMessageContent = (content: string): string => {
    let formattedContent = marked(content) as string; // Parse markdown to HTML using marked

    formattedContent = formattedContent.replace(
      /^\*(.*?)\*/gm,
      '<h4 class="font-semibold text-xl my-2">$1</h4>'
    );

    formattedContent = formattedContent.replace(
      /(\d+\.\s)([^\n]*)/g,
      '<br><br><span class="font-semibold">$1</span>$2<br><br>'
    );

    formattedContent = formattedContent.replace(
      /^-\s(.*?)(?=\n|$)/gm,
      '<br>    <li class="list-disc ml-4">$1</li>'
    );

    formattedContent = formattedContent.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    return formattedContent;
  };

  const renderAIMessageContent = (content: string) => {
    const formattedContent = formatAIMessageContent(content);
    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  const renderUserMessageContent = (content: string) => {
    const lines = content
      .trim()
      .split("\n")
      .map((line) => line.trim());

    return lines.map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {line}
      </p>
    ));
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
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />

          {/* main contents */}
          <main className="flex-1 overflow-auto p-2 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Saved Chats</h2>
            {savedChats.length === 0 ? (
              <p>No saved chats found.</p>
            ) : (
              <div className="gap-4 flex flex-col">
                {savedChats.map((chat, chatIndex) => (
                  <div
                    key={chatIndex}
                    className={`p-2 rounded-xl ${
                      isDarkMode ? "bg-gray-800 text-white" : "bg-gray-300"
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
                        className={`ml-4 p-2 rounded-xl ${
                          isDarkMode ? " text-white" : "text-black"
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
                            className={`p-3 rounded-xl ${
                              message.type === "user"
                            }`}
                          >
                            <div className="text-md leading-relaxed">
                              {message.type === "user"
                                ? renderUserMessageContent(
                                    typeof message.content === "string"
                                      ? message.content
                                      : JSON.stringify(message.content)
                                  )
                                : renderAIMessageContent(
                                    typeof message.content === "string"
                                      ? message.content
                                      : JSON.stringify(message.content)
                                  )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex justify-end mt-24">
                  <button
                    className={`ml-auto gap-1.5 ${isDarkMode} rounded-full px-3.5 py-2`}
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
