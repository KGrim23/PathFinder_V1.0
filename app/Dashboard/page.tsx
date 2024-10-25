"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatInterface from "../components/ChatInterface";
import SettingsPage from "../SettingPage/page";
import ProgressPage from "../ProgressPage/page";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Navbar from "../components/Navbar";
import { useTheme } from "../components/ThemeContext";
import SavedChatsPage from "../saved-chats/page";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { CircleX } from "lucide-react";

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
        chatHistory: messages.map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.content,
        })),
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

  // Function to close the current chat and reset the state
  const closeChat = () => {
    setMessages([]);
    setInputMessage("");
  };

  return (
    <TooltipProvider>
      <div
        className={`grid min-h-screen w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {!isMobile && <Sidebar isMobile={false} />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />

          <main className="flex-1 overflow-auto p-4 flex flex-col">
            {currentPage === "chat" && (
              <>
                <div className="flex justify-end items-center mb-6">
                  {messages.length > 0 && ( // Conditional rendering of the button
                    <button
                      onClick={closeChat}
                      className="rounded-full p-2"
                      aria-label="Close chat"
                    >
                      <CircleX className="dark:text-white" />
                    </button>
                  )}
                </div>
                <ChatInterface
                  messages={messages}
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  handleSendMessage={handleSendMessage}
                  handleOptionClick={handleOptionClick}
                  handleFeedback={handleFeedback}
                  saveChatHistory={saveChatHistory}
                />
              </>
            )}
            {currentPage === "settings" && <SettingsPage />}
            {currentPage === "progress" && <ProgressPage />}
            {currentPage === "saved-chats" && <SavedChatsPage />}
            {currentPage === "sidebar" && <Sidebar isMobile={false} />}

            <p className="flex m-4 items-center justify-center text-xs text-grey-600">
              <span>Lumny AI</span> &nbsp;can make mistakes. Check important
              info.
            </p>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
