"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../components/ThemeContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";
import Link from "next/link";
import ChatInterface from "../components/ChatInterface";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SettingsPage from "../SettingPage/page";
import ProgressPage from "../ProgressPage/page";
import SavedChatsPage from "../saved-chats/page";
import Card from "../components/Card";
import VoiceInput from "../components/VoiceInput";
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

type Article = {
  title: string;
  link: string;
  image: string;
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

  const saveChatHistory = () => {
    localStorage.setItem("savedChats", JSON.stringify(messages));
    alert("Chat history saved!");
  };

  const sendMessageToOpenAI = async (message: string) => {
    try {
      setLoading(true);

      // Add user message immediately
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", content: message },
      ]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          chatHistory: messages.map((msg) => ({
            role: msg.type === "user" ? "user" : "assistant",
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Add AI message placeholder
      const newMessageIndex = messages.length + 1;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "ai",
          content: "",
          feedback: { liked: false, disliked: false, sound: false },
        },
      ]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });

          // Update AI message content incrementally
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            if (lastMessage && lastMessage.type === "ai") {
              lastMessage.content += text;
            }
            return updatedMessages;
          });
        }
      }
    } catch (error) {
      console.error("Error sending message to OpenAI:", error);
      alert("An error occurred while sending the message.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    sendMessageToOpenAI(option);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    await sendMessageToOpenAI(inputMessage);
    setInputMessage("");
  };

  const handleFeedback = (
    index: number,
    type: "liked" | "disliked" | "sound"
  ) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      if (updatedMessages[index].feedback) {
        updatedMessages[index].feedback![type] =
          !updatedMessages[index].feedback![type];
      }
      return updatedMessages;
    });
  };

  const closeChat = () => {
    setMessages([]);
    setInputMessage("");
  };

  const articles: Article[] = [
    {
      title: "Definition of Self-Motivation",
      link: "https://example.com/ai",
      image:
        "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    // ... add other articles
  ];

  const renderCards = () => (
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-2">
      {articles.map((article, index) => (
        <Card
          key={index}
          title={article.title}
          link={article.link}
          imageSrc={article.image}
        />
      ))}
    </div>
  );

  const renderOptions = () => {
    if (messages.length === 0) {
      return (
        <div
          className={`mb-2 rounded-lg p-2 ${
            isDarkMode ? "bg-black" : "bg-muted"
          }`}
        >
          <h2 className="mb-6 text-lg font-semibold">
            How can I assist you today?
          </h2>
          <div className="flex flex-wrap gap-2 items-center justify-self-auto text-xs">
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
                className={`rounded-full p-3 items-center ${
                  isDarkMode
                    ? "bg-gray-800 border-0 shadow-xs shadow-slate-100"
                    : "bg-gray-600 text-white border-0 shadow-xs shadow-slate-100"
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
          <VoiceInput onReceiveText={sendMessageToOpenAI} />

          <main className="flex-1 overflow-auto p-3 flex flex-col relative">
            {renderOptions()}
            {currentPage === "chat" && (
              <>
                <div className="flex justify-start items-center mb-6 mt-4 ml-4">
                  {messages.length > 0 && (
                    <button
                      onClick={closeChat}
                      className="rounded-full p-2 z-10 dark:text-white"
                      aria-label="Close chat"
                    >
                      <CircleX />
                    </button>
                  )}
                </div>

                {messages.length === 0 && (
                  <div className="flex flex-wrap justify-between mt-4">
                    {renderCards()}
                    <button className="bg-slate-700 text-white w-full mt-4 p-2 border-0 rounded-full">
                      <Link
                        href="/mini-courses"
                        className="text-white font-bold text-sm p-4"
                      >
                        Mini-courses
                      </Link>
                    </button>
                  </div>
                )}

                <ChatInterface
                  messages={messages}
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  handleOptionClick={handleOptionClick}
                  handleFeedback={handleFeedback}
                  handleSendMessage={handleSendMessage}
                />
              </>
            )}
            {currentPage === "settings" && <SettingsPage />}
            {currentPage === "progress" && <ProgressPage />}
            {currentPage === "saved-chats" && <SavedChatsPage />}

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
