"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../components/ThemeContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "../globals.css";

export const Hero = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const [startChat, setStartChat] = useState(false);

  // Detect mobile screen size
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStartChat = () => {
    setStartChat(true);
    router.push("/chats"); // This will navigate to the 'Chats' page
  };

  return (
    <>
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-4 p-2 lg:mb-10">
        {/* Left Section */}
        <div className="flex flex-col lg:w-3/5 items-center justify-center text-center lg:text-left">
          <h2 className="mt-2">
            <strong
              className="text-black mb-4 dark:text-white text-2xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-semibold"
              style={{
                background:
                  "linear-gradient(to right, #00aaff, #aa00ff, #00ff6a, #ff003c)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              PathFinder AI Career Advisor
            </strong>
            <p
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold"
              style={{ lineHeight: "1.8" }}
            >
              is designed to guide students in making informed academic and
              career choices with personalized AI-powered insights.
            </p>
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex lg:w-2/5 items-center justify-center p-4">
          <Image
            src="/rb1.png"
            priority
            alt="PathFinder AI Logo"
            width={600}
            height={600}
            className="w-full max-w-[500px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-10 lg:mt-20">
        {" "}
        <Button
          onClick={handleStartChat}
          className={`mt-10 gap-1.5 text-lg lg:text-xl lg:mt-4 lg:p-6 ${
            isDarkMode ? "bg-black text-white" : "text-black"
          } rounded-full px-3.5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500`}
          style={{
            transition: "background-color 0.3s ease, transform 0.2s ease",
          }}
        >
          Ready for a chat?
        </Button>
      </div>
      {/* Information Section */}
      <div className="flex flex-col h-full mt-8 lg:mt-10 lg:mb-10 items-center justify-center leading-loose">
        <h3 className="text-black dark:text-white text-3xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-normal mb-4">
          What is PathFinder AI?
        </h3>
        <p
          className="p-2 mb-10 text-md lg:text-2xl xl:text-2xl dark:text-gray-400"
          style={{ lineHeight: "1.9" }}
        >
          Get personalized career guidance with our AI-powered advisor. Based on
          your skills and interests, it suggests tailored career paths,
          university courses, and skill development tips. Receive instant
          answers to your questions and visualize your career journey with
          interactive roadmaps. Stay up-to-date with the latest industry trends
          and make informed decisions about your future.
        </p>
      </div>

      {/* Features Section */}
      <div className="h-full text-black dark:text-gray-400 p-6 lg:p-10">
        <h1 className="text-black dark:text-white text-center text-3xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-normal mb-8">
          Career Guidance for High School Students
        </h1>
        <div className="space-y-8 dark:text-gray-400 mb-10">
          {/* Main Information */}
          <section>
            <h2 className="text-xl lg:text-3xl font-semibold mb-4">
              How a Career Advisor Can Help
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Exploring career options</li>
              <li>Getting industry information</li>
              <li>Getting advice on specific jobs</li>
              <li>Developing a CV</li>
              <li>Understanding the job market</li>
              <li>Searching and applying for jobs</li>
              <li>Applying for training schemes</li>
              <li>Identifying skills</li>
            </ul>
          </section>

          {/* Benefits of Career Guidance */}
          <section>
            <h2 className="text-xl lg:text-3xl font-semibold mb-4">
              Benefits of Career Guidance in Schools
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Make more informed decisions</li>
              <li>Achieve new goals</li>
              <li>Develop career-planning skills</li>
              <li>Become more confident about post-16 choices</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl lg:text-3xl font-semibold mb-4">
              National Careers Service
            </h2>
            <p className="mb-2">
              For career advice, you can contact the National Careers Service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:0800100900"
                  className="text-blue-500 hover:underline"
                >
                  0800 100 900
                </a>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.gov.uk/careers-helpline-for-teenagers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GOV.UK Careers
                </a>
              </li>
            </ul>
          </section>

          {/* Additional Resources */}
          <section>
            <h2 className="text-xl lg:text-3xl font-semibold mb-4">
              Additional Career Resources
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Reed:</strong>{" "}
                <a
                  href="https://www.reed.co.uk/career-advice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Career Advice Resources
                </a>
              </li>
              <li>
                <strong>Indeed:</strong>{" "}
                <a
                  href="https://www.indeed.com/career-advice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Career Advice
                </a>
              </li>
              <li>
                <strong>The Careers & Enterprise Company:</strong>{" "}
                <a
                  href="https://www.careersandenterprise.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  National Network of Support
                </a>
              </li>
              <li>
                <strong>Gatsby:</strong>{" "}
                <a
                  href="https://www.gatsby.org.uk/education/focus-areas/good-career-guidance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mb-10"
                >
                  Good Career Guidance
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};
