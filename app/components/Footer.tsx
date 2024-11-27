import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 shadow-sm shadow-slate-100 bg-white text-black flex flex-col gap-2 p-4 w-full shrink-0 items-center md:px-6 dark:text-white dark:bg-black">
      <p className="text-sm text-black font-normal dark:text-gray-400">
        © 2024 PathFinder AI. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:gap-6">
        <a className="text-sm hover:underline underline-offset-4" href="/terms">
          Terms of Service
        </a>
        <a
          className="text-sm mb-2 hover:underline underline-offset-4"
          href="/privacy-policy"
        >
          Privacy Policy
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
