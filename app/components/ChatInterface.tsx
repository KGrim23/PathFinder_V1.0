"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeContext";
import ChatInput from "./ChatInput";
import { Import, Volume2, VolumeX } from "lucide-react";
import AWS from "aws-sdk";
import { marked } from "marked"; //for markdown parsing
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
    setInputMessage("");
    await handleSendMessage(e);
  };

  const saveChatHistory = () => {
    const existingSessions = JSON.parse(
      localStorage.getItem("chatSessions") || "[]"
    ) as MessageType[][];
    const newSession = messages;
    existingSessions.push(newSession);
    localStorage.setItem("chatSessions", JSON.stringify(existingSessions));
    setChatSessions(existingSessions);
    alert("Chat history saved!");
  };

  const formatAIMessageContent = (content: string): string => {
    let formattedContent = marked(content) as string;

    // Replace "*" at the start of a line with heading (h4)
    formattedContent = formattedContent.replace(
      /^\*(.*?)\*/gm,
      '<h4 class="font-bold text-xl my-2">$1</h4>'
    );

    // Format numbered lists (1., 2., etc.) with additional line breaks between each step
    formattedContent = formattedContent.replace(
      /(\d+\.\s)([^\n]*)/g,
      '<br><br><span class="font-semibold">$1</span>$2<br><br>'
    );

    // Format bullet points (-) with indentation and line breaks for clarity
    formattedContent = formattedContent.replace(
      /^-\s(.*?)(?=\n|$)/gm,
      '<br>    <li class="list-disc ml-4">$1</li>'
    );

    // Handle inline bold text by wrapping in <strong>
    formattedContent = formattedContent.replace(
      /\*\*(.*?)\*\*/g,
      "<span class='text-blue-600'>$1</span>"
    );

    return formattedContent;
  };

  const renderAIMessageContent = (content: string) => {
    const formattedContent = formatAIMessageContent(content);
    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  const renderUserMessageContent = (content: string) => {
    const lines = content
      .trim()
      .split("\n")
      .map((line) => line.trim());

    // Render each line as a separate paragraph
    return lines.map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {line}
      </p>
    ));
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
      TextType: "ssml", //this is to make sure non-robotic voice and use natural voice
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
      <div className="flex-1 overflow-y-auto mb-4 p-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === "user" ? "text-right" : "text-left"
            }`}
          >
            {message.type === "ai" ? (
              <div>{renderAIMessageContent(message.content as string)}</div>
            ) : (
              <div>{renderUserMessageContent(message.content as string)}</div>
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
      </div>

      {messages.length > 0 && (
        <div className="flex justify-center mb-4">
          <Button
            className="ml-4 bg-primary hover:bg-primary-dark text-black dark:text-white"
            onClick={saveChatHistory}
          >
            Save Chat History
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
