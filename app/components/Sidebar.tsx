"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import Image from "next/image";

export default function Sidebar({ isMobile }: { isMobile: boolean }) {
  const [currentPage, setCurrentPage] = useState<string>("");

  return (
    <aside
      className={`flex flex-col h-full border-r bg-white ${
        isMobile ? "w-64" : "w-16"
      } transition-width duration-300 ease-in-out`}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Home"
          className="w-full"
        >
          <Image
            src="/lumny_logo_1.png"
            alt="Lumny Logo"
            width={30}
            height={30}
          />
          {isMobile && (
            <h1 className="text-md ml-2 font-semibold">Lumny App</h1>
          )}
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
              onClick={() => setCurrentPage("chat")}
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
              onClick={() => setCurrentPage("history")}
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
              onClick={() => setCurrentPage("progress")}
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
              onClick={() => setCurrentPage("settings")}
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
              className="rounded-lg w-full flex items-center justify-start p-2"
            >
              <Avatar>
                <AvatarImage src="/profile-1.png" alt="profile pic" />
                <AvatarFallback>EP</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1 bg-white p-2 rounded-lg">
                <p className="font-semibold">Emily Paris</p>
                <p className="text-sm text-muted-foreground">Free trial tier</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  );
}
