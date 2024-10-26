"use client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useState, useEffect } from "react";
import { useTheme } from "../components/ThemeContext";
import { Star } from "lucide-react"; // Import a star icon for ratings

export default function FeedbackPage() {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const feedbackData = [
    { name: "User1", feedback: "Great experience!", rating: 4 },
    { name: "User2", feedback: "Very helpful and friendly.", rating: 5 },
    { name: "User3", feedback: "Could use some improvements.", rating: 3 },
    { name: "User4", feedback: "Excellent guidance and support.", rating: 5 },
    { name: "User5", feedback: "Satisfactory service.", rating: 4 },
  ];

  return (
    <TooltipProvider>
      <div
        className={`grid h-screen w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {isMobile && isSidebarOpen && <Sidebar isMobile={true} />}

        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />
          <div className="p-6">
            <h1 className="text-2xl font-semibold">User Feedback</h1>
            <div className="mt-4 space-y-4">
              {feedbackData.map((item) => (
                <div key={item.name} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{item.name}</span>
                    <div className="flex">
                      {Array(item.rating)
                        .fill(null)
                        .map((_, i) => (
                          <Star key={i} className="text-yellow-500" />
                        ))}
                    </div>
                  </div>
                  <p className="mt-2">{item.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
