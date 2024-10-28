"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useTheme } from "../components/ThemeContext";

const courses = [
  {
    id: "unlocking-your-potential-a-guide-to-self-moti-638657017233065814",
    title: "Unlocking Your Potential: A Guide to Self-Motivation",
    description: "A comprehensive guide to help you boost self-motivation.",
    image:
      "https://cdn.minicoursegenerator.com/production/images/kalaya638657015031762583/AI_ed8305cd-25ea-4fd2-8647-baa1c20bf934.jpg",
  },
];

export default function CourseList() {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 lg:p-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
              Mini Courses
            </h1>
            <div className="flex justify-center flex-wrap">
              {/* Use flex-wrap to make it responsive */}
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/mini-courses/${course.id}`}
                  className="max-w-xs m-4 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 p-4 transform transition duration-300 hover:scale-105"
                >
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={240}
                    className="object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                      {course.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
