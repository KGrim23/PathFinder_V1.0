// Sidebar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { useTheme } from "./ThemeContext";

interface SidebarProps {
  onChatSelect: (index: number) => void; // Define the onChatSelect prop type
}

export default function Sidebar({ onChatSelect }: SidebarProps) {
  const { isDarkMode } = useTheme();
  const [savedChats, setSavedChats] = useState<any[]>([]);

  useEffect(() => {
    const chats = localStorage.getItem("chatSessions");
    if (chats) {
      try {
        const parsedChats = JSON.parse(chats);
        if (Array.isArray(parsedChats)) {
          setSavedChats(parsedChats);
        }
      } catch (error) {
        console.error("Failed to load saved chats", error);
      }
    }
  }, []);

  const navigateToChatSession = (index: number) => {
    onChatSelect(index); // Call onChatSelect passed from the parent
  };

  return (
    <aside
      className={`lg:fixed top-0 flex flex-col min-h-screen w-64 px-6 transition-all duration-300 ease-in-out position-fixed mb-10 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Saved Chats List */}
      <div className="flex flex-col gap-4 mt-6">
        {savedChats.map((chat, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="flex items-center gap-2 p-2"
                onClick={() => navigateToChatSession(index)}
              >
                <History className="w-5 h-5 text-black dark:text-white" />
                <span className="text-black dark:text-white">
                  Session {index + 1}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Chat Session {index + 1}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </aside>
  );
}
