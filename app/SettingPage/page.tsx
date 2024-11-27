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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SavedChatsPage from "../saved-chats/page";

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
    alert("Settings saved!");
  };

  const clearCahce = () => {
    localStorage.clear();
    alert("Cache cleared!");
  };

  const handleAvatarSelect = (src: string) => {
    setSelectedAvatar(src);
  };

  return (
    <TooltipProvider>
      <div
        className={`grid min-h-screen w-full mt-16 ${isDarkMode ? "dark" : ""}`}
      >
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />

          <Card className="w-full max-w-5xl lg:ml-64 border-0 items-center justify-center">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile">
                <TabsList className="flex justify-start gap-1 mb-10">
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

                  {/* <TabsTrigger
                    value="personalisation"
                    className="flex-grow sm:flex-grow-0 text-lg"
                  >
                    Personalisation
                  </TabsTrigger> */}
                </TabsList>

                <TabsContent value="profile">
                  <div className="flex flex-col mb-10 md:flex-row md:items-center md:space-x-4 md:space-y-0 space-y-4">
                    <Avatar className="w-24 h-24 mx-auto md:mx-0">
                      <AvatarImage src={selectedAvatar} alt="Profile picture" />
                      <AvatarFallback>
                        <User className="w-12 h-12" />
                      </AvatarFallback>
                    </Avatar>

                    {/* Dialog Trigger */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="mt-6 mb-10 md:mt-0 bg-gray-800 text-white rounded-xl"
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
                                onClick={() => handleAvatarSelect(avatar.src)}
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

                  {/* Username */}
                  <div className="grid gap-4 mb-10">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-base bg-slate-200 border-0 rounded-xl"
                      />
                    </div>

                    {/* Emails */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-base bg-slate-200 border-0 rounded-xl"
                      />
                    </div>

                    {/* Pronouns */}
                    <div className="space-y-2">
                      <Label htmlFor="pronouns">Pronouns</Label>
                      <Input
                        id="pronouns"
                        type="pronouns"
                        value={pronouns}
                        onChange={(e) => setPronouns(e.target.value)}
                        className="text-base bg-slate-200 border-0 rounded-xl"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications">
                  <div className="grid gap-10 mb-10 text-md lg:text-lg">
                    {["messages", "emails", "updates"].map((key) => (
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

                <TabsContent value="personalisation">
                  <div className="grid gap-10 mb-10">
                    <div className="flex items-center justify-between space-x-2 ">
                      <div className="space-y-0.5 ">
                        <Label className="text-md lg:text-lg">
                          Archive Chat History
                        </Label>
                      </div>
                      <Button>
                        <Archive size={16} />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between space-x-2 ">
                      <div className="space-y-0.5 ">
                        <Label className="text-md lg:text-lg">
                          Clear Chat History
                        </Label>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={clearCahce}
                        className="flex items-center justify-center space-x-2"
                      >
                        <Trash2 size={16} />
                        <span className="text-sm lg:text-md">Clear</span>
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
    </TooltipProvider>
  );
}
