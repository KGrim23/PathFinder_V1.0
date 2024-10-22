"use client";

import React from "react";
import { Bell, Menu, Sun, Moon } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { useTheme } from "./ThemeContext"; // Assuming you have a ThemeContext

interface NavbarProps {
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isMobile }) => {
  const { isDarkMode, toggleDarkMode } = useTheme(); // Use ThemeContext

  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center justify-between bg-white dark:bg-black px-4 shadow">
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar isMobile={true} />
          </SheetContent>
        </Sheet>
      )}
      <h1 className="text-xl font-semibold">Lumny</h1>
      {/* Right side container for buttons */}
      <div className="flex items-center gap-2 ml-auto">
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
          onClick={() => {
            // Handle notifications
            console.log("Notifications clicked");
          }}
        >
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
