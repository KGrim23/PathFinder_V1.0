"use client";

import React, { useEffect, useState } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useTheme } from "@/app/components/ThemeContext";
import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

const MiniCoursePage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src="https://share.minicoursegenerator.com/viewer.js"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://share.minicoursegenerator.com/viewer.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <TooltipProvider>
      <div
        className={`grid h-screen w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {/* Mobile Sidebar */}
        {isMobile && isSidebarOpen && <Sidebar isMobile={true} />}

        <div className="flex flex-col h-full">
          {/* Render Navbar */}
          <Navbar isMobile={isMobile} />
          <div className="min-h-screen flex flex-col p-4 bg-gray-100 dark:bg-gray-900">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
              Unlocking Your Potential: A Guide to Self-Motivation
            </h1>
            <div className="flex-grow w-full">
              <iframe
                id="mcg"
                name="mcg_frame"
                title="Mini-Course"
                src="https://share.minicoursegenerator.com/unlocking-your-potential-a-guide-to-self-moti-638657017233065814"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-screen border-none dark:bg-gray-800 dark:text-white"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MiniCoursePage;
