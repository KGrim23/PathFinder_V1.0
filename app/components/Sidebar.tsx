"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeContext";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquarePlus,
  History,
  Settings2,
  LifeBuoy,
  Bell,
} from "lucide-react";
import Image from "next/image";
import CustomUserButton from "./CustomUserButton";

export default function Sidebar() {
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState<string>("");
  const router = useRouter();

  const navigateToSavedChats = () => {
    router.push("/saved-chats");
  };

  const goToNotificationPage = () => {
    router.push("/Notifications");
  };

  const goToSettingPage = () => {
    router.push("/SettingPage");
  };

  return (
    <aside
      className={`lg:fixed top-0 flex flex-col min-h-screen w-64 transition-all duration-300 ease-in-out position-fixed mb-10 ${
        isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center p-2 mt-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Home"
          onClick={() => {
            setCurrentPage("chat");
            router.push("/"); // Landing Page
          }}
          className="w-full flex items-center justify-start "
        >
          <span className="ml-2 font-semibold text-2xl">
            <Image src="/sidebar.png" alt="Logo" width={100} height={150} />
          </span>
        </Button>
      </div>

      {/* Top Navigation with Buttons */}
      <nav className="flex-grow flex flex-col gap-8 lg:gap-10 p-2 mt-8">
        {/* New Chat */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`flex items-center gap-2 rounded-lg transition-colors duration-200 ${
                currentPage === "chat"
                  ? "bg-muted text-primary"
                  : "text-gray-700"
              } w-full p-2 justify-start`}
              onClick={() => {
                setCurrentPage("chats");
                router.push("/chats");
              }}
            >
              <MessageSquarePlus className="w-5 h-5 text-black dark:text-white" />
              <span className="text-black dark:text-white text-md">
                New Chat
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">New Chat</TooltipContent>
        </Tooltip>

        {/* History */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`flex items-center gap-2 rounded-lg transition-colors duration-200 ${
                currentPage === "history"
                  ? "bg-muted text-primary"
                  : "text-gray-700"
              } w-full p-2 justify-start`}
              onClick={navigateToSavedChats}
            >
              <History className="w-5 h-5 text-black dark:text-white" />
              <span className="text-black dark:text-white text-md">
                History
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">History</TooltipContent>
        </Tooltip>

        {/* Settings */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`flex items-center gap-2 rounded-lg transition-colors duration-200 ${
                currentPage === "settings"
                  ? "bg-muted text-primary"
                  : "text-gray-700"
              } w-full p-2 justify-start`}
              onClick={() => {
                setCurrentPage("settings");
                router.push("/SettingPage");
              }}
            >
              <Settings2 className="w-5 h-5 text-black dark:text-white" />
              <span className="text-black dark:text-white text-md">
                Settings
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>

        {/* Help */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`flex items-center gap-2 rounded-lg transition-colors duration-200 ${
                currentPage === "help"
                  ? "bg-muted text-primary"
                  : "text-gray-700"
              } w-full p-2 justify-start`}
              onClick={() => {
                setCurrentPage("help");
                router.push("/HelpPage");
              }}
            >
              <LifeBuoy className="w-5 h-5 text-black dark:text-white" />
              <span className="text-black dark:text-white text-md">Help</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Help</TooltipContent>
        </Tooltip>

        {/* Notifications Page */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={goToNotificationPage}
              variant="ghost"
              size="icon"
              className={`flex items-center gap-2 rounded-lg transition-colors duration-200 w-full p-2 justify-start`}
            >
              <Bell className="w-5 h-5 text-black dark:text-white" />
              <span className="text-black dark:text-white text-md">
                Notifications
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Notifications</TooltipContent>
        </Tooltip>
      </nav>

      {/* Profile Section */}
      <nav className="p-2 bottom-0 mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CustomUserButton />
          </DropdownMenuTrigger>
        </DropdownMenu>
      </nav>
    </aside>
  );
}
