"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Menu, Sun, Moon, Home } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { useTheme } from "./ThemeContext";
import Link from "next/link";
import { Hero } from "./Hero"; // Ensure Hero component is imported correctly

export type NavbarProps = {
  isMobile: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isMobile }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showHero, setShowHero] = useState(false); // State for controlling Hero component
  const router = useRouter();

  // Function to handle the Home button click
  const goToHomePage = () => {
    setShowHero(true); // Show Hero component
  };

  return (
    <>
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

        {/* Logo */}
        {isMobile && (
          <Link href="/" passHref>
            <Button
              onClick={() => {
                router.push("/dashboard");
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
          {/* Home Button */}
          <Button
            onClick={goToHomePage}
            variant="ghost"
            size="icon"
            aria-label="Go to Hero"
          >
            <Home className="h-5 w-5" />
          </Button>

          {/* Dark Mode Toggle Button */}
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

          {/* Notifications Button */}
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

      {/* Conditionally render the Hero component */}
      {showHero && (
        <div className="hero-container mt-[60px]">
          {" "}
          {/* Ensure Hero is below the Navbar */}
          <Hero />
        </div>
      )}
    </>
  );
};

export default Navbar;
