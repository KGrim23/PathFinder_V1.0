"use client";

import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Camera, Mic, CornerDownLeft } from "lucide-react";

const ChatInput: React.FC<{
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  handleOptionClick: (option: string) => void;
}> = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const { isDarkMode } = useTheme();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="sticky bottom-0 bg-background p-2"
    >
      <div className="relative overflow-hidden rounded-lg bg-background focus-within:ring-1 focus-within:ring-ring">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className={`min-h-1 border-0 p-2 mb-2 shadow-none focus-visible:ring-0 text-base rounded-xl ${
            isDarkMode
              ? "bg-black text-white border-2 border-white"
              : "bg-gray-300 text-black"
          }`}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex items-center p-3 pt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Camera className="size-4" />
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

          <Button
            type="submit"
            size="sm"
            className={`ml-auto gap-1.5 text-white ${
              isDarkMode
                ? "bg-black text-white border-2 border-white"
                : "bg-black"
            } rounded-full px-3.5 py-2`}
          >
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
