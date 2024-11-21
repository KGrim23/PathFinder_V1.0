"use client";

import { useEffect, useState } from "react";
import { Archive, Trash2, User } from "lucide-react";
import { useTheme } from "../components/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "../components/Footer";
import { Checkbox } from "@/components/ui/checkbox";

export default function Component() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [notifications, setNotifications] = useState({
    messages: true,
    mentions: true,
    updates: false,
  });

  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  // Effect to track if it's mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to apply dark mode class to body
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Effect to load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      const { username, email, notifications, isDarkMode } =
        JSON.parse(savedSettings);
      setUsername(username);
      setEmail(email);
      setNotifications(notifications);
    }
  }, [toggleDarkMode]);

  // Save settings to localStorage
  const saveSettingsToLocalStorage = () => {
    const settings = {
      username,
      email,
      notifications,
      isDarkMode,
    };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    console.log("Settings saved:", settings);
  };

  const handleSave = () => {
    saveSettingsToLocalStorage();
  };

  return (
    <TooltipProvider>
      <div
        className={`grid min-h-screen w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />

          <Card className="w-full max-w-5xl mx-auto border-0">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and application settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile">
                <TabsList className="flex justify-start gap-1 mb-20">
                  <TabsTrigger
                    value="profile"
                    className="flex-grow sm:flex-grow-0 text-lg"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="flex-grow sm:flex-grow-0 text-lg"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="personalization"
                    className="flex-grow sm:flex-grow-0 text-lg"
                  >
                    Personalization
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <div className="flex flex-col mb-10 md:flex-row md:items-center md:space-x-4 md:space-y-0 space-y-4">
                    <Avatar className="w-24 h-24 mx-auto md:mx-0">
                      <AvatarImage src="/profile1.png" alt="Profile picture" />
                      <AvatarFallback>
                        <User className="w-12 h-12" />
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mt-6 mb-10 md:mt-0 bg-gray-800 text-white rounded-xl"
                    >
                      Change Avatar
                    </Button>
                  </div>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-base bg-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-base bg-slate-200"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications">
                  <div className="grid gap-10 mb-10 text-md lg:text-lg">
                    {["messages", "mentions", "updates"].map((key) => (
                      <div
                        key={key}
                        className="flex items-center justify-between space-x-4"
                      >
                        <div className="space-y-1">
                          <Label htmlFor={key} className="text-md lg:text-lg">
                            {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                            Notifications
                          </Label>
                          <p className="text-sm lg:text-md text-muted-foreground">
                            {key === "messages"
                              ? "Receive notifications for new messages."
                              : key === "mentions"
                              ? "Receive notifications when you're mentioned."
                              : "Receive notifications about app updates."}
                          </p>
                        </div>
                        <Checkbox
                          id={key}
                          checked={
                            notifications[key as keyof typeof notifications]
                          }
                          onCheckedChange={(checked) =>
                            setNotifications((prev) => ({
                              ...prev,
                              [key]: checked,
                            }))
                          }
                          className={`h-5 w-5 text-blue-500 border-gray-700 dark:border-gray-800 dark:checked:bg-blue-400`}
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="personalization">
                  <div className="grid gap-10 mb-10">
                    <div className="flex items-center justify-between space-x-2 ">
                      <div className="space-y-0.5 ">
                        <Label className="text-md lg:text-lg">
                          Archive Chat History
                        </Label>
                      </div>
                      <Button>
                        <Archive className="w-5 h-5 mr-2" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label className="text-md lg:text-lg">
                          Clear Cache
                        </Label>
                      </div>
                      <Button variant="destructive">
                        <Trash2 className="w-5 h-5 mr-2" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-gray-800 text-white rounded-xl"
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </TooltipProvider>
  );
}
