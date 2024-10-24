"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "./ThemeContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquarePlus,
  History,
  Flag,
  BarChart3,
  Settings2,
  LifeBuoy,
  User,
  CreditCard,
  LogOut,
} from "lucide-react";

export default function Sidebar({ isMobile }: { isMobile: boolean }) {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigateToSavedChats = () => {
    router.push("/saved-chats");
  };

  return (
    <aside
      className={`flex flex-col h-full ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } ${
        isOpen ? (isMobile ? "w-64" : "w-36") : "w-0"
      } transition-width duration-300 ease-in-out`}
      style={{ overflow: isOpen ? "visible" : "hidden" }} // Prevent overflow when closed
    >
      {/* Close Button */}
      {isOpen && (
        <button
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-100 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x h-4 w-4"
          >
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      )}

      {/* Logo Section */}
      <div className="p-4 flex items-start justify-center">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Home"
          className="w-full flex items-center justify-start"
        >
          <Image src="/New_logo.png" alt="Lumny Logo" width={45} height={45} />
          {isMobile && <h1 className="text-md ml-4 font-semibold">Lumny</h1>}
        </Button>
      </div>

      {/* Top Navigation with Buttons */}
      <nav className="flex-grow flex flex-col gap-1 p-2">
        {/* New Chat */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg transition-colors duration-200 ${
                currentPage === "chat"
                  ? "bg-muted text-primary"
                  : "text-gray-700"
              } ${isMobile ? "justify-start" : "justify-center"} w-full p-2`}
              aria-label="New Chat"
              onClick={() => {
                setCurrentPage("chat");
                console.log("Navigating to homepage");
                router.push("/Dashboard"); // Navigate to the homepage
              }}
            >
              <MessageSquarePlus
                className={`size-5 ${isMobile ? "mr-2" : ""}`}
              />
              {isMobile && <span>New Chat</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right">New Chat</TooltipContent>}
        </Tooltip>

        {/* History */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg transition-colors duration-200 ${
                currentPage === "history"
                  ? "bg-muted text-primary"
                  : "text-gray-700"
              } ${isMobile ? "justify-start" : "justify-center"} w-full p-2`}
              aria-label="History"
              onClick={navigateToSavedChats}
            >
              <History className={`size-5 ${isMobile ? "mr-2" : ""}`} />
              {isMobile && <span>History</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right">History</TooltipContent>}
        </Tooltip>

        {/* Feedback */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg transition-colors duration-200 ${
                currentPage === "feedback"
                  ? "bg-muted text-primary"
                  : "text-gray-700"
              } ${isMobile ? "justify-start" : "justify-center"} w-full p-2`}
              aria-label="Feedback"
              onClick={() => setCurrentPage("feedback")}
            >
              <Flag className={`size-5 ${isMobile ? "mr-2" : ""}`} />
              {isMobile && <span>Feedback</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right">Feedback</TooltipContent>}
        </Tooltip>

        {/* Progress */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg transition-colors duration-200 ${
                currentPage === "progress"
                  ? "bg-muted text-primary"
                  : "text-gray-700"
              } ${isMobile ? "justify-start" : "justify-center"} w-full p-2`}
              aria-label="Progress"
              onClick={() => {
                setCurrentPage("progress");
                router.push("/ProgressPage");
              }}
            >
              <BarChart3 className={`size-5 ${isMobile ? "mr-2" : ""}`} />
              {isMobile && <span>Progress</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right">Progress</TooltipContent>}
        </Tooltip>

        {/* Settings */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg transition-colors duration-200 ${
                currentPage === "settings"
                  ? "bg-muted text-primary"
                  : "text-gray-700"
              } ${isMobile ? "justify-start" : "justify-center"} w-full p-2`}
              aria-label="Settings"
              onClick={() => {
                setCurrentPage("settings");
                router.push("/SettingPage");
              }}
            >
              <Settings2 className={`size-5 ${isMobile ? "mr-2" : ""}`} />
              {isMobile && <span>Settings</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right">Settings</TooltipContent>}
        </Tooltip>

        {/* Help */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg transition-colors duration-200 ${
                isMobile ? "justify-start" : "justify-center"
              } w-full p-2`}
              aria-label="Help"
            >
              <LifeBuoy className={`size-5 ${isMobile ? "mr-2" : ""}`} />
              {isMobile && <span>Help</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right">Help</TooltipContent>}
        </Tooltip>
      </nav>

      {/* Help and Profile Section */}
      <nav className="p-2">
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-lg w-full flex items-center justify-start p-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <Avatar>
                <AvatarImage src="/profile-1.png" alt="Profile" />
              </Avatar>
              {isMobile && <span className="ml-2">Sarah Parker</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>User Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2" /> Payments
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  );
}
