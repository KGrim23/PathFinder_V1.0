"use client";

import React, { useState } from "react";
import { Bell, Menu, Sun, Moon } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { useTheme } from "./ThemeContext";
import Link from "next/link";

export type NavbarProps = {
  isMobile: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isMobile }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState<string>("");

  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center justify-between bg-white dark:bg-black px-4 shadow w-full sm:w-[100%] md:w-[80%] lg:w-[80%] mx-auto">
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}
      {isMobile && (
        <Link href="/" passHref>
          <Button
            onClick={() => {
              setCurrentPage("chat");
            }}
            className="text-2xl font-semibold cursor-pointer bg-transparent border-none"
            style={{
              background:
                "linear-gradient(to right, #00aaff, #aa00ff, #00ff6a, #ff003c)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            PathFinder
          </Button>
        </Link>
      )}

      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Dark Mode"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          onClick={() => console.log("Notifications clicked")}
        >
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
