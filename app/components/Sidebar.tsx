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
      className={`flex h-full flex-col border-r bg-white ${
        isMobile ? "w-64" : "w-14"
      }`} // Added bg-white
    >
      <div className="border-b p-2">
        <Button
          variant="outline"
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
        </Button>
      </div>

      <nav className="grid gap-1 p-2">
        {/* New Chat */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg ${
                currentPage === "chat" ? "bg-muted" : ""
              } ${isMobile ? "justify-start" : "justify-center"} w-full`}
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
              className={`rounded-lg ${
                isMobile ? "justify-start" : "justify-center"
              } w-full`}
              aria-label="History"
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
              className={`rounded-lg ${
                isMobile ? "justify-start" : "justify-center"
              } w-full`}
              aria-label="Feedback"
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
              className={`rounded-lg ${
                currentPage === "progress" ? "bg-muted" : ""
              } ${isMobile ? "justify-start" : "justify-center"} w-full`}
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
              className={`rounded-lg ${
                currentPage === "settings" ? "bg-muted" : ""
              } ${isMobile ? "justify-start" : "justify-center"} w-full`}
              aria-label="Settings"
              onClick={() => setCurrentPage("settings")}
            >
              <Settings2 className={`size-5 ${isMobile ? "mr-2" : ""}`} />
              {isMobile && <span>Settings</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right">Settings</TooltipContent>}
        </Tooltip>
      </nav>

      {/* Help and Profile */}
      <nav className="mt-auto grid gap-1 p-2">
        {/* Help */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size={isMobile ? "default" : "icon"}
              className={`rounded-lg ${
                isMobile ? "justify-start" : "justify-center"
              } w-full`}
              aria-label="Help"
            >
              <LifeBuoy className={`size-5 ${isMobile ? "mr-2" : ""}`} />
              {isMobile && <span>Help</span>}
            </Button>
          </TooltipTrigger>
          {!isMobile && <TooltipContent side="right">Help</TooltipContent>}
        </Tooltip>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg w-full flex items-center justify-start"
            >
              <Avatar>
                <AvatarImage src="/profile-1.png" alt="profile pic" />
                <AvatarFallback>EP</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p>Emily Paris</p>
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
