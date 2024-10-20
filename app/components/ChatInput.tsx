"use client";

import React from "react";
import { useTheme } from "./ThemeContext"; // Make sure this path is correct
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
}> = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const { isDarkMode } = useTheme(); // Get isDarkMode from useTheme

  return (
    <form
      onSubmit={handleSendMessage}
      className="sticky bottom-0 bg-background pt-2"
    >
      <div className="relative overflow-hidden rounded-lg bg-background focus-within:ring-1 focus-within:ring-ring">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          className={`min-h-6 resize-none border-0 p-3 mb-2 shadow-none focus-visible:ring-0 text-base rounded-lg ${
            isDarkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-black"
          }`}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
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
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>
          <Button
            type="submit"
            size="sm"
            className="ml-auto gap-1.5 text-white bg-black rounded-full px-3.5 py-2"
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
