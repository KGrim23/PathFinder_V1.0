"use client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useState, useEffect } from "react";
import { useTheme } from "../components/ThemeContext";

export default function ProgressPage() {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { name: "Jan", progress: 30 },
    { name: "Feb", progress: 45 },
    { name: "Mar", progress: 60 },
    { name: "Apr", progress: 70 },
    { name: "May", progress: 85 },
    { name: "Jun", progress: 100 },
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
            <h1 className="text-2xl font-semibold">Monthly Progress</h1>
            <div className="mt-4 space-y-4">
              {data.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium">{item.name}</span>
                  {/* <ProgressBar progress={item.progress} /> */}
                  <span className="ml-2">{item.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
