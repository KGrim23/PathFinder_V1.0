"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, Sun, Moon, Home } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { useTheme } from "./ThemeContext";
import Link from "next/link";
import { Hero } from "./Hero";

export type NavbarProps = {
  isMobile: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isMobile }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showHero, setShowHero] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  // Navigate to Home only if not already on Dashboard
  const goToHomePage = () => {
    if (pathname !== "/Dashboard") {
      setShowHero(true); // Only show Hero if applicable
      router.push("/Dashboard");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex h-[57px] items-center justify-between bg-white dark:bg-black px-4 shadow w-full sm:w-[100%] md:w-[80%] lg:w-[80%] mx-auto">
        {/* Mobile Sidebar Toggle */}
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
        <Link href="/" passHref>
          <Button
            onClick={() => router.push("/")}
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

        {/* Navbar Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Home Button */}
          <Button
            onClick={goToHomePage}
            variant="ghost"
            size="icon"
            aria-label="Go to Home"
            disabled={pathname === "/Dashboard"} // Disable button if already on Dashboard
          >
            <Home className="h-5 w-5" />
          </Button>

          {/* Dark Mode Toggle */}
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

          {/* Notifications */}
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

      {/* Conditionally Render Hero */}
      {showHero && (
        <div className="hero-container mt-[60px]">
          <Hero />
        </div>
      )}
    </>
  );
};

export default Navbar;
