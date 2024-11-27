// SavedChatsPage.tsx
"use client";
import React, { useState, useEffect } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { marked } from "marked";
import { useTheme } from "../components/ThemeContext";
import Sidebar from "../components/Sidebar";

export const SavedChatsPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [savedChats, setSavedChats] = useState<any[][]>([]); // Store chat sessions
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null
  );

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

  // Handle the chat selection when a session is clicked
  const handleChatSelect = (index: number) => {
    setSelectedChatIndex(index);
  };

  const formatAIMessageContent = (content: string): string => {
    let formattedContent = marked(content) as string; // Parse markdown to HTML
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

  return (
    <TooltipProvider>
      <div
        className={`grid h-screen w-full mt-16 p-2  ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {/* Sidebar receives the handleChatSelect function as onChatSelect */}
        <Sidebar onChatSelect={handleChatSelect} />
        <div className="flex flex-col h-full">
          {/* Right content */}
          <main className="flex-1 overflow-auto p-2 flex flex-col lg:ml-64">
            <h2 className="text-2xl font-bold mb-4">Saved Chats</h2>
            {selectedChatIndex !== null ? (
              <div className="space-y-4">
                {savedChats[selectedChatIndex].map((message, messageIndex) => (
                  <div key={messageIndex} className="p-3 rounded-xl">
                    <div className="text-md leading-relaxed">
                      {message.type === "user" && <div>{message.content}</div>}
                      {message.type === "ai" && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: formatAIMessageContent(
                              message.content as string
                            ),
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Please select a chat session.</p>
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};
