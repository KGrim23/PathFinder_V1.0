"use client";

import React, { useState, useEffect } from "react";
import ChatInterface from "../components/ChatInterface";
import SettingsPage from "../SettingPage/page";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Navbar from "../components/Navbar";
import { useTheme } from "../components/ThemeContext";
import SavedChatsPage from "../saved-chats/page";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoiceInput from "../components/VoiceInput";
import "../globals.css";
import Image from "next/image";

type MessageType = {
  type: "user" | "ai";
  content: string;
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

const optionIcons: { [key: string]: string } = {
  "Career Guidence & Coaching": "💬",
  "T Level": "🚀",
  "GCSE Options": "📚",
  "Exam Worries": "🧘",
  "'A' Level": "⚖️",
  "Career Options": "🌟",
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

      const reader = response.body?.getReader();
      let aiResponseContent = "";

      // Check if reader is defined
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break; // Exit the loop when done

          // Convert Uint8Array to string and append to aiResponseContent
          aiResponseContent += new TextDecoder().decode(value);

          // Immediately render the AI response
          const aiMessage: MessageType = {
            type: "ai",
            content: aiResponseContent,
            feedback: { liked: false, disliked: false, sound: false },
          };

          // Set the state with the latest AI response
          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage?.type === "ai") {
              return [...prevMessages.slice(0, -1), aiMessage];
            }
            return [...prevMessages, aiMessage];
          });
        }
      }

      // Final AI response message after streaming
      const finalAiMessage: MessageType = {
        type: "ai",
        content: aiResponseContent || "Sorry, I didn't understand that.",
        feedback: { liked: false, disliked: false, sound: false },
      };
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

  const closeChat = () => {
    setMessages([]);
    setInputMessage("");
  };

  const renderOptions = () => {
    if (messages.length === 0) {
      return (
        <div
          className={`mb-2 rounded-lg p-2 ${
            isDarkMode ? "bg-black" : "bg-muted"
          }`}
        >
          <div className="flex flex-wrap gap-4 lg:gap-6 justify-space-evenly text-xs">
            {Object.keys(optionIcons).map((option) => (
              <Button
                key={option}
                variant="outline" // Use rainbow variant
                size="sm"
                className={`text-[12px] rounded-full p-3 items-center relative overflow-hidden
               ${isDarkMode ? "bg-black" : "bg-black text-white"}`}
                onClick={() => handleOptionClick(option)}
              >
                <span className="mr-2">{optionIcons[option]}</span>
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
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />
          <VoiceInput onReceiveText={sendMessageToOpenAI} />

          <main className="flex-1 overflow-auto xs:w-full sm:w-full h-full md:w-[90%] lg:w-[90%] mx-auto mt-4 lg:mt-10 p-3 flex flex-col relative">
            <div className="flex flex-col lg:flex-row gap-4 p-2 lg:mb-10">
              {/* Left Section */}
              <div className="flex flex-col lg:w-3/5 items-center justify-center text-center lg:text-left">
                <h2 className="mt-6">
                  <strong
                    className="text-black mb-4 dark:text-white text-2xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-semibold"
                    style={{
                      background:
                        "linear-gradient(to right, #00aaff, #aa00ff, #00ff6a, #ff003c)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    PathFinder AI Career Advisor
                  </strong>
                  <p
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold"
                    style={{
                      lineHeight: "1.8",
                    }}
                  >
                    is an intelligent career advisor designed to guide students
                    in making informed academic and career choices with
                    personalized AI-powered insights.
                  </p>
                </h2>
                <Button
                  // onClick={}
                  className={`mt-10 gap-1.5 text-white ${
                    isDarkMode ? "bg-black text-white" : "text-black"
                  } rounded-full px-3.5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500`}
                >
                  Ready for a chat?
                </Button>
              </div>
              {/* Right Section */}
              <div className="flex lg:w-2/5 items-center justify-center p-4">
                <Image
                  src="/rb1.png"
                  priority
                  alt="Logo"
                  width={600}
                  height={600}
                  className="w-full max-w-[500px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
                />
              </div>
            </div>

            <div className="flex flex-col h-full mt-10 lg:mt-20 lg:mb-20 items-center justify-center leading-loose">
              <h3 className="text-black dark:text-white text-3xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-normal mb-4">
                What is PathFinder AI?
              </h3>
              <p
                className="p-2 mb-10 text-md lg:text-2xl xl:text-2xl dark:text-gray-400"
                style={{ lineHeight: "1.9" }}
              >
                Get personalized career guidance with our AI powered advisor.
                Based on your skills and interests, it suggests tailored career
                paths, university courses, and skill development tips. Receive
                instant answers to your questions and visualize your career
                journey with interactive roadmaps. Stay up-to-date with the
                latest industry trends and make informed decisions about your
                future.
              </p>
            </div>

            {renderOptions()}

            {currentPage === "chat" && (
              <>
                {messages.length > 0 && (
                  <button
                    onClick={closeChat}
                    className="rounded-full p-2 z-10 dark:text-white"
                    aria-label="Close chat"
                  >
                    <CircleX />
                  </button>
                )}

                <ChatInterface
                  messages={messages}
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  handleSendMessage={handleSendMessage}
                  handleOptionClick={handleOptionClick}
                  handleFeedback={handleFeedback}
                />
              </>
            )}
            {currentPage === "settings" && <SettingsPage />}
            {currentPage === "saved-chats" && <SavedChatsPage />}
            {currentPage === "sidebar" && <Sidebar />}

            <p className="flex m-4 items-center justify-center text-xs text-grey-600">
              <span>PathFinder AI</span> &nbsp;can make mistakes. Check
              important info.
            </p>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
