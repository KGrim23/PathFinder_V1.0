"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeContext";
import ChatInput from "./ChatInput";
import { Import, Volume2, VolumeX } from "lucide-react";
import AWS from "aws-sdk";

// Configure Polly - go to AWS console
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: "us-west-2",
});

const polly = new AWS.Polly();

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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Track audio playing state
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [chatSessions, setChatSessions] = useState<Array<MessageType[]>>([]); // for saving chat sessions

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

  const handleReadAloud = async (content: any) => {
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

    // Create SSML content
    const ssmlText = `<speak>${textToRead}</speak>`;

    const params = {
      OutputFormat: "mp3",
      Text: ssmlText,
      TextType: "ssml", //this is to make sure non robotic voice and use natural voice
      VoiceId: "Matthew",
    };

    try {
      const { AudioStream } = await polly.synthesizeSpeech(params).promise();
      if (AudioStream instanceof Buffer) {
        const audioBlob = new Blob([AudioStream], { type: "audio/mp3" });
        const audioURL = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioURL);

        audio.onplay = () => {
          setIsAudioPlaying(true);
          setCurrentAudio(audio); // Set current audio
        };
        audio.onended = () => {
          setIsAudioPlaying(false);
          setCurrentAudio(null); // Clear current audio
        };

        audio.play();
      }
    } catch (error) {
      console.error("Error synthesizing speech:", error);
    }
  };

  const handleStopReading = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsAudioPlaying(false);
      setCurrentAudio(null);
    }
  };

  return (
    <div
      className={`flex flex-col h-full ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex-1 overflow-auto mb-4 p-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === "user" ? "text-right" : "text-left"
            }`}
          >
            {message.type === "ai" ? (
              <div>{renderAIMessageContent(message.content)}</div>
            ) : (
              <div>{renderUserMessageContent(message.content)}</div>
            )}
            {message.type === "ai" && (
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    if (isAudioPlaying) {
                      handleStopReading();
                    } else {
                      handleReadAloud(message.content);
                    }
                    setIsAudioPlaying(!isAudioPlaying); // Toggle state
                  }}
                  style={{ zIndex: 10 }} // Set a high z-index value
                >
                  {isAudioPlaying ? (
                    <VolumeX className="mr-2" />
                  ) : (
                    <Volume2 className="mr-2" />
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
        <div className="flex justify-center mb-4">
          <Button
            className="ml-4 bg-primary hover:bg-primary-dark text-black dark:text-white"
            onClick={saveChatHistory}
          >
            <Import className="mr-2" />
            Save Chat
          </Button>
        </div>
      )}

      <div className="mt-auto">
        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleMessageSend}
          handleOptionClick={handleOptionClick}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
