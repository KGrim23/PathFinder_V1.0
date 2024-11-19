import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 py-4 w-full shrink-0 items-center px-4 md:px-6 dark:text-white dark:bg-zinc-900">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 PathFinder AI. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:gap-6">
        <a className="text-xs hover:underline underline-offset-4" href="/terms">
          Terms of Service
        </a>
        <a
          className="text-xs hover:underline underline-offset-4"
          href="/privacy-policy"
        >
          Privacy Policy
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
