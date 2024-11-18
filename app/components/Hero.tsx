"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../components/ThemeContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "../globals.css";

export const Hero = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [startChat, setStartChat] = useState(false);

  // Detect mobile screen size
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStartChat = () => {
    setStartChat(true);
    router.push("/chats"); // This will navigate to the 'Chats' page
  };

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-4 p-2 lg:mb-10">
        {/* Left Section */}
        <div className="flex flex-col lg:w-3/5 items-center justify-center text-center lg:text-left">
          <h2 className="mt-6">
            <strong
              className="text-black mb-4 dark:text-white text-2xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-semibold"
              style={{
                background:
                  "linear-gradient(to right, #00aaff, #aa00ff, #00ff6a, #ff003c)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              PathFinder AI Career Advisor
            </strong>
            <p
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold"
              style={{ lineHeight: "1.8" }}
            >
              is designed to guide students in making informed academic and
              career choices with personalized AI-powered insights.
            </p>
          </h2>
          <Button
            onClick={handleStartChat}
            className={`mt-10 gap-1.5 ${
              isDarkMode ? "bg-black text-white" : "text-black"
            } rounded-full px-3.5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500`}
            style={{
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
          >
            Ready for a chat?
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex lg:w-2/5 items-center justify-center p-4">
          <Image
            src="/rb1.png"
            priority
            alt="PathFinder AI Logo"
            width={600}
            height={600}
            className="w-full max-w-[500px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
          />
        </div>
      </div>

      {/* Information Section */}
      <div className="flex flex-col h-full mt-10 lg:mt-20 lg:mb-20 items-center justify-center leading-loose">
        <h3 className="text-black dark:text-white text-3xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-normal mb-4">
          What is PathFinder AI?
        </h3>
        <p
          className="p-2 mb-10 text-md lg:text-2xl xl:text-2xl dark:text-gray-400"
          style={{ lineHeight: "1.9" }}
        >
          Get personalized career guidance with our AI-powered advisor. Based on
          your skills and interests, it suggests tailored career paths,
          university courses, and skill development tips. Receive instant
          answers to your questions and visualize your career journey with
          interactive roadmaps. Stay up-to-date with the latest industry trends
          and make informed decisions about your future.
        </p>
      </div>
    </>
  );
};
