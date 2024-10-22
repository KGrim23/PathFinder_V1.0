"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatInterface from "./ChatInterface";
import SettingsPage from "../SettingPage/page";
import ProgressPage from "../ProgressPage/page";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Navbar from "./Navbar";
import { useTheme } from "./ThemeContext";
import Sidebar from "./Sidebar";
import SavedChatsPage from "../saved-chats/page";
import { useRouter } from "next/navigation"; // Changed from next/router to next/navigation

type MessageType = {
  type: "user" | "ai";
  content: string;
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

export default function Dashboard() {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState<string>("chat");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to save chat history to local storage
  const saveChatHistory = () => {
    localStorage.setItem("savedChats", JSON.stringify(messages));
    alert("Chat history saved!");
  };

  // Function to send message to OpenAI API
  const sendMessageToOpenAI = async (message: string) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/chat", {
        message,
      });

      const aiResponseContent = response.data?.response;

      const aiMessage: MessageType = {
        type: "ai",
        content: aiResponseContent || "Sorry, I didn't understand that.",
        feedback: { liked: false, disliked: false, sound: false },
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message to OpenAI API:", error);

      const errorMessage: MessageType = {
        type: "ai",
        content: "Sorry, something went wrong. Please try again.",
        feedback: { liked: false, disliked: false, sound: false },
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const newUserMessage: MessageType = { type: "user", content: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    await sendMessageToOpenAI(inputMessage);
    setInputMessage("");
  };

  const handleOptionClick = (option: string) => {
    const newUserMessage: MessageType = { type: "user", content: option };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    sendMessageToOpenAI(option);
  };

  const handleFeedback = (
    index: number,
    type: "liked" | "disliked" | "sound"
  ) => {
    const updatedMessages = [...messages];
    updatedMessages[index].feedback![type] =
      !updatedMessages[index].feedback![type];
    setMessages(updatedMessages);
  };

  const navigateToSavedChats = () => {
    router.push("/saved-chats");
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
            {currentPage === "chat" && (
              <>
                <ChatInterface
                  messages={messages}
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  handleSendMessage={handleSendMessage}
                  handleOptionClick={handleOptionClick}
                  handleFeedback={handleFeedback}
                />
                <div className="flex justify-center space-x-8 mt-8">
                  <button
                    onClick={saveChatHistory}
                    className="bg-black border-2 border-blue-700 text-white rounded px-4 py-1"
                  >
                    Save Chat
                  </button>
                  <button
                    onClick={navigateToSavedChats}
                    className="bg-black border-2 border-green-700 text-white rounded px-4 py-1"
                  >
                    View Chats
                  </button>
                </div>
              </>
            )}
            {currentPage === "settings" && <SettingsPage />}
            {currentPage === "progress" && <ProgressPage />}
            {currentPage === "saved-chats" && <SavedChatsPage />}
            <div className="mb-16"></div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
