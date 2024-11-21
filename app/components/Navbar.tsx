"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, Sun, Moon, Home } from "lucide-react"; // Icons
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { useTheme } from "./ThemeContext";
import LandingPage from "../LandingPage/page";

export type NavbarProps = {
  isMobile: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isMobile }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showHero, setShowHero] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const goToHomePage = () => {
    if (pathname !== "/LandingPage") {
      setShowHero(true); // Only show home button if it is not already on the home page
      router.push("/LandingPage");
    }
  };

  const goToNotificationPage = () => {
    router.push("/Notifications");
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex h-[57px] items-center justify-between dark:text-white dark:bg-black px-4 shadow w-full sm:w-[100%] md:w-[80%] lg:w-[80%] mx-auto">
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

        {/* Navbar Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Home Button */}
          <Button
            onClick={goToHomePage}
            variant="ghost"
            size="icon"
            aria-label="Go to Home"
            disabled={pathname === "/LandingPage"} // Disable button if already on Dashboard
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
            onClick={goToNotificationPage}
            variant="ghost"
            size="icon"
            aria-label="Go to Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Conditionally Render Hero */}
      {showHero && (
        <div className="hero-container mt-[60px]">
          <LandingPage />
        </div>
      )}
    </>
  );
};

export default Navbar;
