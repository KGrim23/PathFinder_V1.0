"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useTheme } from "../components/ThemeContext";
import Footer from "../components/Footer";

const PrivacyPolicy: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Effect to track if it's mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

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

          {/* Main Content */}
          <main className="flex-1 overflow-auto flex flex-col">
            <div className="max-w-3xl mx-auto p-2 text-gray-800 dark:text-gray-200">
              <div className="flex flex-col justify-center p-4 text-md">
                <h1 className="text-xl font-bold mb-6">Privacy Policy</h1>

                <p className="mb-6 text-md">
                  This Privacy Policy describes how PathFinder ("we," "us," or
                  "our") collects, uses, discloses, and protects your
                  information when you use the Path Finder App (the “App”). By
                  accessing or using our App, you agree to the terms of this
                  Privacy Policy. If you do not agree with these terms, please
                  do not use our App.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  1. Information We Collect
                </h2>
                <p className="mb-6">
                  We may collect information about you in various ways,
                  including:
                </p>
                <ul className="list-disc ml-8 mb-6">
                  <li>
                    <strong>Personal Information:</strong> Information you
                    provide, like name, email.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Automatically collected data
                    like IP address.
                  </li>
                  <li>
                    <strong>Cookies and Tracking:</strong> Technologies to track
                    app usage.
                  </li>
                </ul>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc ml-8 mb-6">
                  <li>Provide and maintain our App.</li>
                  <li>Personalize your experience.</li>
                  <li>Communicate and process transactions.</li>
                </ul>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  3. Data Security
                </h2>
                <p className="mb-6">
                  We take reasonable measures to protect your information from
                  unauthorized access.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  4. Your Rights
                </h2>
                <p className="mb-6">
                  You can request access, correction, or deletion of your
                  personal information.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  5. Changes to This Privacy Policy
                </h2>
                <p className="mb-6">
                  We may update this policy and notify you of significant
                  changes.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  6. Contact Us
                </h2>
                <p className="mb-6">
                  If you have questions, contact us at PathFinder.com
                </p>
                <p className="mb-6 text-sm">Last updated: 22-11-2024</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PrivacyPolicy;
