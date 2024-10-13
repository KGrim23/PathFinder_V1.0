"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Sidebar from "./Sidebar";
import { Bell, Menu } from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import ChatInterface from "./ChatInterface";
import SettingsPage from "../SettingPage/page";
import ProgressPage from "../ProgressPage/page";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

type HandleSendMessageType = (e: React.FormEvent<HTMLFormElement>) => void;
type HandleOptionClickType = (option: string) => void;
type HandleFeedbackType = (
  index: number,
  type: "liked" | "disliked" | "sound"
) => void;

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<string>("chat");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to send message to OpenAI API
  const sendMessageToOpenAI = async (message: string) => {
    try {
      setLoading(true); // Set loading state to true
      const response = await axios.post("/api/chat", {
        message,
      });

      const aiMessage: MessageType = {
        type: "ai",
        content: response.data.response,
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

  const handleSendMessage: HandleSendMessageType = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const newUserMessage: MessageType = { type: "user", content: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Send message to OpenAI
    await sendMessageToOpenAI(inputMessage);
    setInputMessage("");
  };

  const handleOptionClick: HandleOptionClickType = (option) => {
    const newUserMessage: MessageType = { type: "user", content: option };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Send option as message to OpenAI
    sendMessageToOpenAI(option);
  };

  const handleFeedback: HandleFeedbackType = (index, type) => {
    const updatedMessages = [...messages];
    updatedMessages[index].feedback![type] =
      !updatedMessages[index].feedback![type];
    setMessages(updatedMessages);
  };

  return (
    <TooltipProvider>
      <div className="grid h-screen w-full md:grid-cols-[auto_1fr]">
        {!isMobile && <Sidebar isMobile={false} />}
        <div className="flex flex-col h-full">
          {/* NavBar */}
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-white px-4 shadow">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar isMobile={true} />
                </SheetContent>
              </Sheet>
            )}
            <h1 className="text-xl font-semibold">Lumny App</h1>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </Button>
          </header>

          <main className="flex-1 overflow-auto p-4 flex flex-col">
            {currentPage === "chat" && (
              <ChatInterface
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
                handleOptionClick={handleOptionClick}
                handleFeedback={handleFeedback}
              />
            )}
            {currentPage === "settings" && <SettingsPage />}
            {currentPage === "progress" && <ProgressPage />}
            {/* Add extra margin at the bottom of the main area */}
            <div className="mb-16"></div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
