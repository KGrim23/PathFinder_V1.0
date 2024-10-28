"use client";

import React, { useEffect } from "react";

const MiniCoursePage: React.FC = () => {
  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src="https://share.minicoursegenerator.com/viewer.js"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://share.minicoursegenerator.com/viewer.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 px-4 py-8 lg:px-16">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Unlocking Your Potential: A Guide to Self-Motivation
      </h1>
      <div className="w-full h-full max-w-3xl shadow-lg rounded-lg overflow-hidden">
        <div className="relative pb-[56.25%]">
          <iframe
            id="mcg"
            name="mcg_frame"
            title="Mini-Course"
            src="https://share.minicoursegenerator.com/unlocking-your-potential-a-guide-to-self-moti-638657017233065814"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute inset-0 w-full h-full border-none rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MiniCoursePage;
