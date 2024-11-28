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
        className={`grid min-h-screen w-full md:grid-cols-[auto_1fr] mt-10${
          isDarkMode ? "dark" : ""
        } ${
          isMobile ? "" : "lg:grid-cols-[auto_1fr]" // Grid layout for large screens
        }`}
      >
        {/* Sidebar will only display on non-mobile view */}
        {!isMobile && <Sidebar />}

        <div className="flex flex-col w-full">
          <Navbar isMobile={isMobile} />

          {/* Main content section should take the rest of the available space */}
          <div className="flex-1 w-full p-4 lg:ml-64 ">
            <NotificationsPage />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Page;
