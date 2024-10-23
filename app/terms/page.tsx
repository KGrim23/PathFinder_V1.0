// pages/terms.tsx
"use client"; // Added for client-side rendering
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // Import Sidebar component
import Navbar from "../components/Navbar"; // Import Navbar component
import { TooltipProvider } from "@radix-ui/react-tooltip"; // Tooltip provider for tooltips
import { useTheme } from "../components/ThemeContext";

const Terms: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Effect to toggle dark mode class
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Effect to track if it's mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Call on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  return (
    <TooltipProvider>
      <div
        className={`grid h-screen w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {/* Sidebar for larger screens */}
        {!isMobile && <Sidebar isMobile={false} />}
        {/* Mobile sidebar toggle button */}
        {isMobile && (
          <button
            className="md:hidden p-4 text-gray-800"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
        )}
        {/* Mobile Sidebar */}
        {isMobile && isSidebarOpen && <Sidebar isMobile={true} />}

        <div className="flex flex-col h-full">
          {/* Render Navbar */}
          <Navbar isMobile={isMobile} />
          <main className="flex-1 overflow-auto p-4 flex flex-col">
            <div className="max-w-3xl mx-auto p-6">
              <div className="flex flex-col justify-center p-4 text-gray-800">
                <h1 className="text-xl font-bold mb-6">Terms of Service</h1>

                <p className="text-gray-800 mb-6">
                  Last updated: {new Date().toLocaleDateString()}
                </p>

                <p className="text-gray-800 mb-6">
                  Welcome to the Lumny App! By using our services, you agree to
                  the following terms. If you do not agree with these terms,
                  please do not use our services.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-800 mb-6">
                  By using the Lumny App, you affirm that you are at least 18
                  years old or have the consent of a parent or guardian to use
                  the app. If you are using the app on behalf of a company or
                  organization, you represent that you have the authority to
                  bind that entity to these terms.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  2. Changes to the Terms
                </h2>
                <p className="text-gray-800 mb-6">
                  We may modify these terms at any time. If we make changes, we
                  will notify you by revising the “Effective Date” at the top of
                  these terms. Your continued use of the app after any changes
                  constitutes your acceptance of the new terms.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  3. Use of the Service
                </h2>
                <p className="text-gray-800 mb-6">
                  You agree to use the Lumny App only for lawful purposes and in
                  accordance with these terms. You agree not to use the app:
                </p>
                <ul className="list-disc ml-8 mb-6 text-gray-800">
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
                <p className="text-gray-800 mb-6">
                  To the fullest extent permitted by law, in no event shall
                  Lumny, its affiliates, or their licensors, service providers,
                  employees, agents, or contractors be liable for damages of any
                  kind, including without limitation any direct, indirect,
                  special, incidental, consequential, or punitive damages,
                  arising out of or in connection with your use of or inability
                  to use the Lumny App.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  5. Governing Law
                </h2>
                <p className="text-gray-800 mb-6">
                  These terms shall be governed by and construed in accordance
                  with the laws of [Insert State/Country], without regard to its
                  conflict of law principles.
                </p>

                <h2 className="text-lg font-semibold mt-4 mb-4">
                  6. Contact Us
                </h2>
                <p className="text-gray-800 mb-6">
                  If you have any questions about these terms, please contact us
                  at [Insert Contact Information].
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Terms;
