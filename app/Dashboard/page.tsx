"use client";

import React, { useState, useEffect } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Navbar from "../components/Navbar";
import { useTheme } from "../components/ThemeContext";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import "../globals.css";
import { Hero } from "../components/Hero";

type MessageType = {
  type: "user" | "ai";
  content: string;
  feedback?: {
    liked: boolean;
    disliked: boolean;
    sound: boolean;
  };
};

export default function Dashboard() {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <TooltipProvider>
      <div
        className={`grid min-h-screen w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />
          {/* <VoiceInput onReceiveText={sendMessageToOpenAI} /> */}

          <main className="flex-1 overflow-auto w-full sm:w-full h-full md:w-[90%] lg:w-[90%] mx-auto mt-4 lg:mt-10 p-4 flex flex-col relative">
            <Hero />

            <p className="flex m-4 items-center justify-center text-xs text-grey-600">
              <span>PathFinder AI</span> &nbsp;can make mistakes. Check
              important info.
            </p>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
