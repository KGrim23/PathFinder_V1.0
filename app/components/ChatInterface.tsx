"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeContext";
import ChatInput from "./ChatInput";
import { Import, Volume2, VolumeX } from "lucide-react";

// User Message Type
type UserMessage = {
  type: "user";
  content: string;
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

// AI Message Type
type AIMessage = {
  type: "ai";
  content:
    | {
        dialogue?: Array<{ speaker: string; message: string }>;
        steps?: Array<{ step_number: number; instruction: string }>;
        rawMessage?: string;
      }
    | string;
};

type MessageType = UserMessage | AIMessage;

type ChatInterfaceProps = {
  messages: MessageType[];
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleOptionClick: (option: string) => void;
  handleFeedback: (index: number, type: "liked" | "disliked" | "sound") => void;
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleOptionClick,
  handleFeedback,
}) => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUtterance, setCurrentUtterance] =
    useState<SpeechSynthesisUtterance | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [chatSessions, setChatSessions] = useState<Array<MessageType[]>>([]);

  useEffect(() => {
    // Load existing chat sessions from local storage
    const existingSessions = JSON.parse(
      localStorage.getItem("chatSessions") || "[]"
    );
    setChatSessions(existingSessions);
  }, []);

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setInputMessage("");
    await handleSendMessage(e);
    setIsLoading(false);
  };

  const saveChatHistory = () => {
    const existingSessions = JSON.parse(
      localStorage.getItem("chatSessions") || "[]"
    ) as MessageType[][];
    const newSession = messages;
    existingSessions.push(newSession);
    localStorage.setItem("chatSessions", JSON.stringify(existingSessions));
    setChatSessions(existingSessions);
  };

  const renderAIMessageContent = (content: any) => {
    if (typeof content === "object" && content !== null) {
      if (content.dialogue && Array.isArray(content.dialogue)) {
        return (
          <div>
            {content.dialogue.map(
              (msg: { speaker: string; message: string }, index: number) => (
                <div key={index} className="mb-2">
                  {msg.message}
                </div>
              )
            )}
          </div>
        );
      }
      if (content.steps && Array.isArray(content.steps)) {
        return (
          <div className="mt-4">
            <ul className="ml-6 list-disc">
              {content.steps.map(
                (
                  step: { step_number: number; instruction: string },
                  index: number
                ) => (
                  <li key={step.step_number}>
                    {step.instruction.replace(/\*/g, "").trim()}
                  </li>
                )
              )}
            </ul>
          </div>
        );
      }
      return <p>{content.rawMessage || "No structured content available."}</p>;
    }

    if (typeof content === "string") {
      try {
        const parsedContent = JSON.parse(content);
        return renderAIMessageContent(parsedContent);
      } catch {
        return <p>{content}</p>;
      }
    }

    return <p>No valid content available.</p>;
  };

  const renderUserMessageContent = (content: string) => {
    const lines = content.split("\n");

    return lines.map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3 key={index} className="font-semibold text-lg mb-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-2 list-disc">
            {line.replace(/^- /, "")}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <li key={index} className="ml-6 mb-2 list-decimal">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      }
      return (
        <p key={index} className="mb-2 last:mb-0">
          {line}
        </p>
      );
    });
  };

  const handleReadAloud = (content: any) => {
    let textToRead = "";

    // Build the text to read
    if (typeof content === "object" && content !== null) {
      if (content.dialogue && Array.isArray(content.dialogue)) {
        textToRead = content.dialogue
          .map((msg: { message: any }) => msg.message)
          .join(" ");
      } else if (content.steps && Array.isArray(content.steps)) {
        textToRead = content.steps
          .map((step: { instruction: any }) => step.instruction)
          .join(" ");
      } else if (content.rawMessage) {
        textToRead = content.rawMessage;
      }
    } else if (typeof content === "string") {
      try {
        const parsed = JSON.parse(content);
        if (parsed.dialogue) {
          textToRead = parsed.dialogue
            .map((msg: { message: string }) => msg.message)
            .join(" ");
        } else if (parsed.steps) {
          textToRead = parsed.steps
            .map((step: { instruction: string }) => step.instruction)
            .join(" ");
        } else if (parsed.rawMessage) {
          textToRead = parsed.rawMessage;
        }
      } catch {
        textToRead = content;
      }
    }

    // Clean up the text
    textToRead = textToRead
      .replace(/\*\*/g, "")
      .replace(/\n/g, " ")
      .replace(/Assistant:|Human:|Speaker:|Dialog:|^\s*-\s*/gim, "")
      .replace(/\s+/g, " ")
      .trim();

    if (currentUtterance && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setCurrentUtterance(null);
      setIsAudioPlaying(false);
    } else if (textToRead) {
      const utterance = new SpeechSynthesisUtterance(textToRead);

      // Set voice and parameters...
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find(
          (voice) =>
            (voice.name.includes("Google") ||
              voice.name.includes("Premium") ||
              voice.name.includes("Enhanced")) &&
            voice.lang.startsWith("en")
        ) || voices.find((voice) => voice.lang.startsWith("en"));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      // Optimize speech parameters
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      setCurrentUtterance(utterance);

      // When speech starts
      utterance.onstart = () => {
        setIsAudioPlaying(true);
      };

      // When speech ends
      utterance.onend = () => {
        setIsAudioPlaying(false);
        setCurrentUtterance(null);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStopReading = () => {
    if (currentUtterance) {
      window.speechSynthesis.cancel();
      setIsAudioPlaying(false);
      setCurrentUtterance(null);
    }
  };

  return (
    <div
      className={`flex flex-col h-full ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex-1 overflow-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === "user" ? "text-right" : "text-left"
            }`}
          >
            {message.type === "ai" ? (
              <div>
                {/* <p className="font-bold">Assistant:</p> */}
                {renderAIMessageContent(message.content)}
              </div>
            ) : (
              <div>
                {/* <p className="font-bold">You:</p> */}
                {renderUserMessageContent(message.content)}
              </div>
            )}
            {message.type === "ai" && (
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    if (isAudioPlaying) {
                      handleStopReading(); // Stop audio if playing
                    } else {
                      handleReadAloud(message.content); // Start audio otherwise
                    }
                  }}
                >
                  {isAudioPlaying ? (
                    <>
                      <VolumeX className="mr-2" />
                      {/* <span>Stop</span> */}
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2" />
                      {/* <span>Read Aloud</span> */}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-center mt-4">
            <p className="text-lg">Loading...</p>
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="flex justify-end p-3 mt-8">
          <button
            onClick={saveChatHistory}
            className={`flex items-center font-normal py-2 px-4 rounded-xl transition-colors duration-200
            focus:ring-2 focus:ring-offset-2 ${
              isDarkMode
                ? "focus:ring-gray-600 focus:ring-offset-gray-800"
                : "focus:ring-gray-300 focus:ring-offset-white"
            }`}
          >
            <Import className="mr-2" />
          </button>
        </div>
      )}

      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleMessageSend}
      />
    </div>
  );
};

export default ChatInterface;
