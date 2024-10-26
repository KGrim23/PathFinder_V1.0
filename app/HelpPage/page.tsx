"use client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useState, useEffect } from "react";
import { useTheme } from "../components/ThemeContext";

export default function HelpPage() {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const helpTopics = [
    {
      topic: "Getting Started",
      description: "Learn the basics of using our app.",
    },
    {
      topic: "Account Settings",
      description: "Manage your account information and preferences.",
    },
    {
      topic: "Troubleshooting",
      description: "Resolve common issues with easy-to-follow steps.",
    },
    {
      topic: "Privacy & Security",
      description:
        "Understand our privacy policies and data protection measures.",
    },
    {
      topic: "Contact Support",
      description: "Get in touch with our support team for additional help.",
    },
  ];

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
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Help & Support</h1>
            <div className="mt-4 space-y-4">
              {helpTopics.map((item) => (
                <div
                  key={item.topic}
                  className="p-4 border-b border-gray-200 dark:border-gray-700"
                >
                  <h2 className="text-lg font-semibold">{item.topic}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
