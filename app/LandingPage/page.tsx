"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen mb-6 mt-6">
      {/* Background Image Section */}
      <div className="relative w-full h-screen">
        <Image
          src="/landing.jpg"
          alt="Background Image"
          layout="fill"
          priority
          objectFit="cover"
          quality={100}
          className="absolute z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content Over the Image */}
        <div className="absolute inset-0 flex flex-col justify-between items-center z-10">
          <div className="flex flex-col items-center space-x-4 gap-4 mt-16">
            {/* Logo */}
            <Image
              src="/lumny-new.png"
              alt="Lumny Logo"
              width={55}
              height={55}
            />

            {/* Centered Heading */}
            <h1 className="text-3xl md:text-6xl text-gray-950 font-semibold">
              Lumny App
            </h1>
          </div>

          {/*


          {/* Sign-up Button and Footer Links at the Bottom */}
          <div className="mb-16 flex flex-col items-center">
            <Link
              href="/Dashboard"
              className="px-6 py-1 text-lg bg-black text-white border-2 border-white rounded-xl hover:bg-blue-700 transition"
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
