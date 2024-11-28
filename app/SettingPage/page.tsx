"use client";

import { useEffect, useState } from "react";
import { Archive, Trash2, User } from "lucide-react";
import { useTheme } from "../components/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SettingPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pronouns, setPronouns] = useState<string>("");
  const [notifications, setNotifications] = useState({
    messages: true,
    mentions: true,
    updates: false,
  });

  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("/profile1.png");

  // Avatar options
  const avatars = [
    { src: "/profile1.png", alt: "Avatar 1" },
    { src: "/profile2.png", alt: "Avatar 2" },
    { src: "/profile3.png", alt: "Avatar 3" },
  ];

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
      const { username, email, pronouns, notifications, isDarkMode } =
        JSON.parse(savedSettings);
      setUsername(username);
      setEmail(email);
      setPronouns(pronouns);
      setNotifications(notifications);
    }
  }, [toggleDarkMode]);

  // Save settings to localStorage
  const saveSettingsToLocalStorage = () => {
    const settings = {
      username,
      email,
      pronouns,
      notifications,
      isDarkMode,
    };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    console.log("Settings saved:", settings);
  };

  const handleSave = () => {
    saveSettingsToLocalStorage();
    alert("Settings saved!");
  };

  const clearCache = () => {
    localStorage.clear();
    alert("Cache cleared!");
  };

  const handleAvatarSelect = (src: string) => {
    setSelectedAvatar(src);
  };

  return (
    <TooltipProvider>
      <div className={`min-h-screen w-full ${isDarkMode ? "dark" : ""}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile and Desktop Navbar */}
          <Navbar isMobile={isMobile} />

          {/* Sidebar for desktop */}
          <div className="lg:flex">
            {!isMobile && (
              <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
                <Sidebar />
              </div>
            )}

            {/* Main Content Area */}
            <div className="w-full lg:max-w-4xl lg:mx-auto mt-10 sm:mt-8 lg:mt-12">
              <Card className="w-full border-0 shadow-none">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl mb-4">
                    Settings
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="profile" className="space-y-4">
                    <TabsList className="grid grid-cols-3 gap-4 w-full mb-16">
                      <TabsTrigger
                        value="profile"
                        className="text-sm sm:text-base py-2"
                      >
                        Profile
                      </TabsTrigger>
                      <TabsTrigger
                        value="notifications"
                        className="text-sm sm:text-base py-2"
                      >
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger
                        value="personalisation"
                        className="text-sm sm:text-base py-2"
                      >
                        Personalisation
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-8">
                      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Avatar className="w-24 h-24 mx-auto sm:mx-0">
                          <AvatarImage
                            src={selectedAvatar}
                            alt="Profile picture"
                          />
                          <AvatarFallback>
                            <User className="w-12 h-12" />
                          </AvatarFallback>
                        </Avatar>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="w-full sm:w-auto bg-gray-800 text-white rounded-xl"
                            >
                              Change Avatar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm bg-gray-900 dark:bg-gray-600 border-0 rounded-xl lg:rounded-xl">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-semibold">
                                Choose an Avatar
                              </DialogTitle>
                            </DialogHeader>
                            <CardContent>
                              <div className="grid grid-cols-3 gap-4">
                                {avatars.map((avatar) => (
                                  <div
                                    key={avatar.src}
                                    className="cursor-pointer p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() =>
                                      handleAvatarSelect(avatar.src)
                                    }
                                  >
                                    <Avatar>
                                      <AvatarImage
                                        src={avatar.src}
                                        alt={avatar.alt}
                                      />
                                    </Avatar>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                            <DialogFooter>
                              <Button variant="secondary">Close</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {/* Input fields with improved responsiveness */}
                      <div className="space-y-4">
                        {[
                          {
                            label: "Username",
                            type: "text",
                            value: username,
                            setter: setUsername,
                          },
                          {
                            label: "Email",
                            type: "email",
                            value: email,
                            setter: setEmail,
                          },
                          {
                            label: "Pronouns",
                            type: "text",
                            value: pronouns,
                            setter: setPronouns,
                          },
                        ].map(({ label, type, value, setter }) => (
                          <div key={label} className="space-y-2">
                            <Label htmlFor={label.toLowerCase()}>{label}</Label>
                            <Input
                              id={label.toLowerCase()}
                              type={type}
                              value={value}
                              onChange={(e) => setter(e.target.value)}
                              className="w-full text-base bg-slate-200 border-0 rounded-xl"
                            />
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-6">
                      <div className="grid gap-6">
                        {["messages", "emails", "updates"].map((key) => (
                          <div
                            key={key}
                            className="flex items-center justify-between space-x-4"
                          >
                            <div className="space-y-1">
                              <Label
                                htmlFor={key}
                                className="text-md sm:text-lg"
                              >
                                {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                                Notifications
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                {key === "messages"
                                  ? "Receive notifications for new messages."
                                  : key === "emails"
                                  ? "Receive notifications when you get new emails."
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

                    <TabsContent value="personalisation" className="space-y-6">
                      <div className="grid gap-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-md sm:text-lg">
                              Archive Chat History
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Save your current chat history
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Archive size={16} className="mr-2" />
                            Archive
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <Label className="text-md sm:text-lg">
                              Clear Chat History
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Permanently delete all chat history
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={clearCache}
                            className="flex items-center"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Clear
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>

                <CardFooter className="flex justify-end mt-4">
                  <Button
                    onClick={handleSave}
                    className="w-full sm:w-auto bg-gray-800 text-white rounded-xl"
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
