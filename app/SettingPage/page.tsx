"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTheme } from "../components/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingPage() {
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Track if it's mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <TooltipProvider>
      <div
        className={`grid min-h-screen mt-16 w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full mb-10">
          <Navbar isMobile={isMobile} />

          <div className="container w-full lg:ml-64 p-4 items-center justify-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Settings</h1>
            <div className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 mt-16 border-0 bg-gray-600 text-white rounded-xl"
              />
            </div>

            {/* Tabs for General and Notifications */}
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4 mt-16">
                <TabsTrigger
                  value="general"
                  className="text-md lg:text-lg rounded-lg transition-colors duration-300 peer hover:bg-slate-400 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="text-md lg:text-lg rounded-lg transition-colors duration-300 peer hover:bg-slate-400 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="goals"
                  className="text-md lg:text-lg rounded-lg transition-colors duration-300 peer hover:bg-slate-400 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  Goals
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
                  {/* General Settings Cards */}
                  <Card className="grid grid-cols-3 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-200 text-black dark:bg-gray-700 dark:text-white border-0 rounded-xl">
                    {/* Left side: 2/3 for Title and Description */}
                    <div className="col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">Theme</CardTitle>
                        <CardDescription>
                          Select light or dark modes.
                        </CardDescription>
                      </CardHeader>
                    </div>

                    {/* Right side: 1/3 for Footer and Button */}
                    <div className="col-span-1 flex items-center justify-center">
                      <CardFooter className="w-full">
                        <Button variant="ghost" className="rounded-xl w-full">
                          Change Theme
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>

                  <Card className="grid grid-cols-3 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-200 text-black dark:bg-gray-700 dark:text-white border-0 rounded-xl">
                    <div className="col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">System</CardTitle>
                        <CardDescription>System-level settings</CardDescription>
                      </CardHeader>
                    </div>

                    <div className="col-span-1 flex items-center justify-center">
                      <CardFooter className="w-full">
                        <Button variant="ghost" className="rounded-xl w-full">
                          Adjust Settings
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>

                  <Card className="grid grid-cols-3 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-200 text-black dark:bg-gray-700 dark:text-white border-0 rounded-xl">
                    <div className="col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Archived Chats
                        </CardTitle>
                        <CardDescription>
                          Manage your archived chats
                        </CardDescription>
                      </CardHeader>
                    </div>

                    <div className="col-span-1 flex items-center justify-center">
                      <CardFooter className="w-full">
                        <Button variant="ghost" className="rounded-xl w-full">
                          Manage Chats
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
                  {/* Notifications Settings Cards */}
                  <Card className="grid grid-cols-3 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-200 text-black dark:bg-gray-700 dark:text-white border-0 rounded-xl">
                    {/* Left side: 2/3 for Title and Description */}
                    <div className="col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Email Notifications
                        </CardTitle>
                        <CardDescription>
                          Manage your email notifications
                        </CardDescription>
                      </CardHeader>
                      {/* <CardContent className="flex-grow">
                        <p>
                          Enable or disable email notifications for updates.
                        </p>
                      </CardContent> */}
                    </div>

                    {/* Right side: 1/3 for Footer and Button */}
                    <div className="col-span-1 flex items-center justify-center p-4">
                      <CardFooter className="w-full">
                        <Button variant="ghost" className="rounded-xl w-full">
                          Manage
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>

                  <Card className="grid grid-cols-3 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-200 text-black dark:bg-gray-700 dark:text-white border-0 rounded-xl">
                    <div className="col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Push Notifications
                        </CardTitle>
                        <CardDescription>
                          Configure push notifications
                        </CardDescription>
                      </CardHeader>
                      {/* <CardContent className="flex-grow">
                        <p>Set your preferences for push notifications.</p>
                      </CardContent> */}
                    </div>

                    <div className="col-span-1 flex items-center justify-center p-4">
                      <CardFooter className="w-full">
                        <Button variant="ghost" className="rounded-xl w-full">
                          Manage
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* Goals Tab */}
              <TabsContent value="goals">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-10">
                  {/* Goals Settings Cards */}
                  <Card className="grid grid-cols-3 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-200 text-black dark:bg-gray-700 dark:text-white border-0 rounded-xl">
                    {/* Left side: 2/3 for Title and Description */}
                    <div className="col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Short-term Goals
                        </CardTitle>
                        <CardDescription>Your GCSE goals</CardDescription>
                      </CardHeader>
                      {/* <CardContent className="flex-grow">
                        <p>Set your preferences for short term goals.</p>
                      </CardContent> */}
                    </div>

                    {/* Right side: 1/3 for Footer and Button */}
                    <div className="col-span-1 flex items-center justify-center p-4">
                      <CardFooter className="w-full">
                        <Button variant="ghost" className="rounded-xl w-full">
                          Manage
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>

                  <Card className="grid grid-cols-3 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-200 text-black dark:bg-gray-700 dark:text-white border-0 rounded-xl">
                    <div className="col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Long-term Goals
                        </CardTitle>
                        <CardDescription>Your 'A' Levels goals</CardDescription>
                      </CardHeader>
                      {/* <CardContent className="flex-grow">
                        <p>Set your preferences for Long term goals.</p>
                      </CardContent> */}
                    </div>

                    <div className="col-span-1 flex items-center justify-center p-4">
                      <CardFooter className="w-full">
                        <Button variant="ghost" className="rounded-xl w-full">
                          Manage
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>

                  <Card className="grid grid-cols-3 gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gray-200 text-black dark:bg-gray-700 dark:text-white border-0 rounded-xl">
                    <div className="col-span-2">
                      <CardHeader>
                        <CardTitle className="text-lg">Career Goals</CardTitle>
                        <CardDescription>Your Career Goals</CardDescription>
                      </CardHeader>
                      {/* <CardContent className="flex-grow">
                        <p>Set your preferences for Career goals.</p>
                      </CardContent> */}
                    </div>

                    <div className="col-span-1 flex items-center justify-center p-4">
                      <CardFooter className="w-full">
                        <Button variant="ghost" className="rounded-xl w-full">
                          Manage
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Display message when no results found */}
            {searchQuery && (
              <p className="text-center text-muted-foreground mt-8">
                No results found. Please try a different search term.
              </p>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
