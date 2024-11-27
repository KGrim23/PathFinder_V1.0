"use client";

import React, { useEffect, useState } from "react";
import NotificationsPage from "../components/NotificationsPage";
import { useTheme } from "../components/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Page = () => {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Track if it's mobile view
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
        className={`grid min-h-screen mt-16 w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full mb-10">
          <Navbar isMobile={isMobile} />
          <div>
            <NotificationsPage />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Page;
