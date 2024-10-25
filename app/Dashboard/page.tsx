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
import Card from "../components/Card";
import { Button } from "@/components/ui/button";

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

  // Example articles data
  const articles = [
    { title: "Understanding AI", link: "https://example.com/ai" },
    { title: "Guided Meditation", link: "https://example.com/react" },
    { title: "Get more focus", link: "https://example.com/next" },
    { title: "Advanced Leadership", link: "https://example.com/js" },
    { title: "Leadership", link: "https://example.com/js" },
    { title: "Personal Development", link: "https://example.com/react" },
  ];

  // Function to render cards
  const renderCards = () => {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-2">
        {articles.map((article, index) => (
          <Card
            key={index}
            title={article.title}
            link={article.link}
            imageSrc="https://images.unsplash.com/photo-1729366790976-81844c8dd310?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        ))}
      </div>
    );
  };

  const renderOptions = () => {
    if (messages.length === 0) {
      return (
        <div
          className={`mb-2 rounded-lg p-4 ${
            isDarkMode ? "bg-black" : "bg-muted"
          }`}
        >
          <h2 className="mb-6 text-lg font-semibold">
            How can I assist you today?
          </h2>
          <div className="flex flex-wrap gap-2 items-center justify-self-auto text-sm">
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
                className={`rounded-full items-center ${
                  isDarkMode ? "white-border" : ""
                }`}
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
      );
    }
    return null;
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

          <main className="flex-1 overflow-auto p-4 flex flex-col relative">
            {renderOptions()}
            {currentPage === "chat" && (
              <>
                <div className="flex justify-start items-center mb-6 mt-4 ml-4">
                  {" "}
                  {/* Added margin-top and margin-left */}
                  {messages.length > 0 && ( // Conditional rendering of the button
                    <button
                      onClick={closeChat}
                      className="rounded-full p-2 z-10 dark:text-white"
                      aria-label="Close chat"
                    >
                      <CircleX />
                    </button>
                  )}
                </div>

                {/* Render Cards Section only when there are no messages */}
                {messages.length === 0 && (
                  <div className="flex flex-wrap justify-between mt-4">
                    {renderCards()}
                  </div>
                )}

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
