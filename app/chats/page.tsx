"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../components/ThemeContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import ChatInterface from "../components/ChatInterface";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [isListening, setIsListening] = useState(false);
  const SpeechRecognition =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || (window as any).webkitSpeechRecognition);

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.lang = "en-UK";
      recognition.continuous = false;
      recognition.interimResults = false;

      //debugging
      recognition.onstart = () => console.log("Voice recognition started.");

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        recognition.stop(); // Stop listening after getting the result
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log("Voice recognition ended.");
        setIsListening(false);
      };

      recognition.start();
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  };

  // Ref for the last message in the chat
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

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

  // Scroll to the bottom when new message is added
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

          <main className="flex-1 overflow-hidden w-full lg:ml-64 h-full md:w-[90%] lg:w-[85%] mt-4 lg:mt-10 p-4 flex flex-col relative">
            {/* Chat message content with scroll */}
            <div
              className="flex-1 overflow-y-auto mb-20"
              style={{ paddingBottom: "80px" }}
            >
              <ChatInterface
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
                handleOptionClick={handleOptionClick}
                handleFeedback={handleFeedback}
                saveChatHistory={saveChatHistory}
              />
              {/* Last message ref */}
              <div ref={lastMessageRef}></div>
            </div>
          </main>
        </div>

        {/* Chat input box fixed at the bottom */}
        <div className="fixed bottom-0 left-0 w-full p-6 bg-white dark:bg-black">
          <form
            onSubmit={handleSendMessage}
            className="flex flex-col gap-2" // Flex column to stack the elements
          >
            {/* Input and send button in one row */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow p-2 rounded-xl border-0 bg-gray-200 dark:bg-gray-700 dark:text-white"
                placeholder="Type a message"
              />
              <Button
                type="submit"
                size="sm"
                className={`ml-2 text-white ${
                  isDarkMode
                    ? "bg-black text-white border-2 border-white"
                    : "text-black border-2 border-black bg-white"
                } rounded-xl px-3.5 py-2`}
                disabled={loading || !inputMessage.trim()}
              >
                Send
                {/* <CornerDownLeft className="size-3.5" /> */}
              </Button>
            </div>

            {/* Attach file and mic buttons in a separate row */}
            <div className="flex gap-4 justify-start">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Paperclip className="size-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Attach File</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={startListening}
                    disabled={isListening}
                  >
                    <Mic
                      className={`size-4 ${
                        isListening ? "text-red-500 size-5" : ""
                      }`}
                    />
                    <span className="sr-only">Use Microphone</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  {isListening ? "Listening..." : "Use Microphone"}
                </TooltipContent>
              </Tooltip>
            </div>
          </form>

          {/* Footer Text */}
          <p className="text-xs text-center mt-6 text-gray-500">
            PathFinder AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
};
export default Chats;
