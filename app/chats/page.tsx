"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../components/ThemeContext";
import { CircleX } from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import ChatInterface from "../components/ChatInterface";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

type MessageType = {
  type: "user" | "ai";
  content: string;
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

const Chats = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Save chat history to local storage
  const saveChatHistory = () => {
    localStorage.setItem("savedChats", JSON.stringify(messages));
    alert("Chat history saved!");
  };

  const sendMessageToOpenAI = async (message: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          chatHistory: messages.map((msg) => ({
            role: msg.type === "user" ? "user" : "assistant",
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body?.getReader();
      let aiResponseContent = "";

      if (reader) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "ai",
            content: "",
            feedback: { liked: false, disliked: false, sound: false },
          },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          aiResponseContent += new TextDecoder().decode(value);

          // Update the last AI message during streaming
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1].content =
              aiResponseContent;
            return updatedMessages;
          });
        }
      }
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

  // Handle message sending
  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMessage: MessageType = { type: "user", content: inputMessage };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    await sendMessageToOpenAI(inputMessage);
    setInputMessage("");
  };

  // Handle user option click
  const handleOptionClick = (option: string) => {
    const newUserMessage: MessageType = { type: "user", content: option };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    sendMessageToOpenAI(option);
  };

  // Handle message feedback (liked, disliked, sound)
  const handleFeedback = (
    index: number,
    type: "liked" | "disliked" | "sound"
  ) => {
    const updatedMessages = [...messages];
    updatedMessages[index].feedback![type] =
      !updatedMessages[index].feedback![type];
    setMessages(updatedMessages);
  };

  // Close the chat and reset state
  const closeChat = () => {
    console.log("Closing chat...");
    router.push("/LandingPage");
  };

  return (
    <TooltipProvider>
      <div
        className={`grid min-h-screen w-full mt-16 ${isDarkMode ? "dark" : ""}`}
      >
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />

          <main className="flex-1 overflow-auto w-full lg:ml-64 h-full md:w-[90%] lg:w-[80%] mt-4 lg:mt-10 p-4 flex flex-col relative">
            {messages.length > 0 && (
              <button
                onClick={closeChat}
                className="absolute top-1 left-2 rounded-full p-2 z-10 dark:text-gray-400"
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
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Chats;
