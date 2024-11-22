"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useTheme } from "../components/ThemeContext";
import Footer from "../components/Footer";

const Terms: React.FC = () => {
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
                <h1 className="text-xl font-bold mb-6">Terms of Service</h1>

                <p className="mb-6 text-sm">
                  Welcome to the PathFinder App! By using our services, you
                  agree to the following terms. If you do not agree with these
                  terms, please do not use our services.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="mb-6 text-sm">
                  By using the PathFinder App, you affirm that you are at least
                  18 years old or have the consent of a parent or guardian to
                  use the app. If you are using the app on behalf of a company
                  or organization, you represent that you have the authority to
                  bind that entity to these terms.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  2. Changes to the Terms
                </h2>
                <p className="mb-6 text-sm">
                  We may modify these terms at any time. If we make changes, we
                  will notify you by revising the “Effective Date” at the top of
                  these terms. Your continued use of the app after any changes
                  constitutes your acceptance of the new terms.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  3. Use of the Service
                </h2>
                <p className="mb-6 text-sm">
                  You agree to use the PathFinder App only for lawful purposes
                  and in accordance with these terms. You agree not to use the
                  app:
                </p>
                <ul className="list-disc ml-8 mb-6">
                  <li>
                    In any way that violates any applicable federal, state,
                    local, or international law or regulation.
                  </li>
                  <li>
                    For the purpose of exploiting, harming, or attempting to
                    exploit or harm others in any way.
                  </li>
                </ul>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  4. Limitation of Liability
                </h2>
                <p className="mb-6 text-sm">
                  To the fullest extent permitted by law, in no event shall Path
                  Finder, its affiliates, or their licensors, service providers,
                  employees, agents, or contractors be liable for damages of any
                  kind, including without limitation any direct, indirect,
                  special, incidental, consequential, or punitive damages,
                  arising out of or in connection with your use of or inability
                  to use the PathFinder App.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  5. Governing Law
                </h2>
                <p className="mb-6 text-sm">
                  These terms shall be governed by and construed in accordance
                  with the laws of United Kingdom, without regard to its
                  conflict of law principles.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  6. Contact Us
                </h2>
                <p className="mb-6 text-sm">
                  If you have any questions about these terms, please contact us
                  at PathFinder.com
                </p>
                <p className="mb-6 text-sm">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Terms;
