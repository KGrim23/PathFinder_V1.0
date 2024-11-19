"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="relative flex flex-col space-y-4 items-center justify-center min-h-screen">
      {/* Background Image Section */}
      <div className="relative w-full min-h-screen">
        <div className="absolute inset-0 bg-black"></div>

        {/* Content Over the Image */}
        <div className="absolute inset-0 flex flex-col justify-between items-center z-10">
          <div className="flex flex-col items-center space-x-4 gap-4 m-auto">
            <h1
              className="text-5xl mt-4 md:text-6xl font-semibold"
              style={{
                background:
                  "linear-gradient(to right, #00aaff, #aa00ff, #00ff6a, #ff003c)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              PathFinder
            </h1>

            <strong className="text-white text-xl md:text-2xl text-center p-6">
              {" "}
              AI powered Career Advisor for your Brighter Future ✨
            </strong>
          </div>

          {/* Sign-up Button and Footer Links at the Bottom */}
          <div className="mb-16 flex flex-col items-center">
            <Link
              href="/LandingPage"
              className="px-6 py-1 text-md bg-grey-600 text-white border-2 border-white rounded-xl hover:bg-blue-700 transition"
            >
              Log In
            </Link>

            {/* Footer Links */}
            <div className="mt-4 flex space-x-6 text-sm text-white">
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
