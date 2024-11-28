"use client";

import React, { useState, useEffect, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../components/ThemeContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import ChatInterface from "../components/ChatInterface";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

type MessageType = {
  type: "user" | "ai";
  content: string;
  feedback: {
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
  const [currentChatSessionIndex, setCurrentChatSessionIndex] = useState<
    number | null
  >(null);

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatically save chat history whenever messages change
  const saveChatHistory = useCallback(() => {
    if (messages.length === 0) {
      return; // Don't save empty chat sessions
    }

    const chatSessions = JSON.parse(
      localStorage.getItem("chatSessions") || "[]"
    );

    if (
      currentChatSessionIndex !== null &&
      chatSessions[currentChatSessionIndex]
    ) {
      // Update existing chat session
      chatSessions[currentChatSessionIndex] = messages;
    } else {
      // Add new chat session
      chatSessions.push(messages);
      const newIndex = chatSessions.length - 1;
      setCurrentChatSessionIndex(newIndex);
    }

    localStorage.setItem("chatSessions", JSON.stringify(chatSessions));
  }, [messages, currentChatSessionIndex]);

  // Saving chats automatically when messages change
  useEffect(() => {
    saveChatHistory();
  }, [messages, saveChatHistory]);

  // Load saved chats from localStorage with preload old messages
  useEffect(() => {
    const continuedChat = localStorage.getItem("continuedChatSession");
    const continuedChatIndex = localStorage.getItem(
      "continuedChatSessionIndex"
    );

    if (continuedChat && continuedChatIndex !== null) {
      setMessages(JSON.parse(continuedChat));
      setCurrentChatSessionIndex(parseInt(continuedChatIndex, 10));
    }

    // Clear session flags after loading
    localStorage.removeItem("continuedChatSession");
    localStorage.removeItem("continuedChatSessionIndex");
  }, []);

  // Modify the closeChat function to save before closing
  const closeChat = () => {
    saveChatHistory(); // Save chat before closing
    router.push("/LandingPage");
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

    const newUserMessage: MessageType = {
      type: "user",
      content: inputMessage,
      feedback: { liked: false, disliked: false, sound: false },
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    await sendMessageToOpenAI(inputMessage);
    setInputMessage("");
  };

  // Handle user option click
  const handleOptionClick = (option: string) => {
    const newUserMessage: MessageType = {
      type: "user",
      content: option,
      feedback: { liked: false, disliked: false, sound: false },
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    sendMessageToOpenAI(option);
  };

  // Handle message feedback (liked, disliked, sound)
  const handleFeedback = (
    index: number,
    type: "liked" | "disliked" | "sound"
  ) => {
    const updatedMessages = [...messages];
    updatedMessages[index].feedback[type] =
      !updatedMessages[index].feedback[type];
    setMessages(updatedMessages);
  };

  return (
    <TooltipProvider>
      <div
        className={`grid min-h-screen w-full items-center mt-16 ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />

          <main className="flex-1 overflow-auto w-full lg:ml-64 h-full md:w-[90%] lg:w-[85%] mt-4 lg:mt-10 p-4 flex flex-col relative">
            {/* {messages.length > 0 && (
              <>
                <button
                  onClick={closeChat}
                  className="absolute top-1 left-2 rounded-full p-2 z-10 dark:text-gray-400"
                  aria-label="Close chat"
                >
                  <CircleX />
                </button>
              </>
            )} */}

            <ChatInterface
              messages={messages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              handleOptionClick={handleOptionClick}
              handleFeedback={handleFeedback}
              saveChatHistory={saveChatHistory}
            />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Chats;
