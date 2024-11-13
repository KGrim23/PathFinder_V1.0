"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "../components/ThemeContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
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
        className={`grid h-screen w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {!isMobile && <Sidebar />} {/* Render sidebar */}
        <div className="flex flex-col h-full">
          {/* Render Navbar */}
          <Navbar isMobile={isMobile} />
          <main className="flex-1 overflow-auto p-6 md:p-8 flex flex-col bg-gray-50 dark:bg-gray-900">
            <div className="flex space-x-6 p-4 items-center justify-center md:justify-start">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                onClick={() => setActiveTab("overview")}
                className="flex-1 md:flex-none text-lg font-medium p-4 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                Overview
              </Button>
              <Button
                variant={activeTab === "faq" ? "default" : "ghost"}
                onClick={() => setActiveTab("faq")}
                className="flex-1 md:flex-none text-lg font-medium p-4 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                FAQ
              </Button>
              <Button
                variant={activeTab === "contact" ? "default" : "ghost"}
                onClick={() => setActiveTab("contact")}
                className="flex-1 md:flex-none text-lg font-medium p-4 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                Contact Support
              </Button>
            </div>

            {activeTab === "overview" && (
              <div className="space-y-6 p-4 md:p-6">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  App Overview
                </h2>
                <Card className="border-none shadow-lg bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium">
                      Welcome to the Help Center
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                      Learn how to make the most of the app
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p>
                      This app helps you improve your soft skills and focus on
                      personal and professional growth. Explore settings, learn
                      more, and get guidance on your goals.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-6 p-4 md:p-6">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
                <Card className="border-none shadow-lg bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium">
                      Common Questions
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                      Answers to frequently asked questions about the app
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
                    <ul className="space-y-3">
                      <li>
                        <strong className="font-medium">
                          How do I change my settings?
                        </strong>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Go to the settings page from the sidebar to adjust
                          your preferences.
                        </p>
                      </li>
                      <li>
                        <strong className="font-medium">
                          Can I track my progress?
                        </strong>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Yes, you can monitor your progress through the
                          dashboard and set personal goals.
                        </p>
                      </li>
                      <li>
                        <strong className="font-medium">
                          How can I get support?
                        </strong>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Contact support through the contact page for help with
                          any issues.
                        </p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="space-y-6 p-4 md:p-6">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Contact Support
                </h2>
                <Card className="border-none shadow-lg bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium">
                      Get in Touch
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                      Reach out to our support team for assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
                    <p>
                      If you have any issues or questions, feel free to contact
                      us.
                    </p>
                    <Button variant="outline" className="w-full md:w-auto">
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default HelpPage;
