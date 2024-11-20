"use client";

import { useEffect, useState } from "react";
import { Archive, Bell, Moon, Sun, Trash2, User } from "lucide-react";
// import { useTheme } from "next-themes";
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "../components/Footer";

export default function Component() {
  const [username, setUsername] = useState("johndoe");
  const [email, setEmail] = useState("john@example.com");
  const [notifications, setNotifications] = useState({
    messages: true,
    mentions: true,
    updates: false,
  });
  const [autoDeleteMessages, setAutoDeleteMessages] = useState(false);
  // const { theme, setTheme } = useTheme();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior for Sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    console.log("Saving settings:", {
      username,
      email,
      notifications,
      isDarkMode,
      autoDeleteMessages,
    });
    // Add backend API call here
  };

  return (
    <TooltipProvider>
      <div className={`grid min-h-screen w-full ${isDarkMode ? "dark" : ""}`}>
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />

          <Card className="w-full max-w-5xl mx-auto border-0 dark:bg-black">
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
                    className="flex-grow sm:flex-grow-0"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="flex-grow sm:flex-grow-0"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="personalization"
                    className="flex-grow sm:flex-grow-0"
                  >
                    Personalization
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <div className="flex flex-col mb-10 md:flex-row md:items-center md:space-x-4">
                    <Avatar className="w-24 h-24 mx-auto md:mx-0">
                      <AvatarImage src="/profile1.png" alt="Profile picture" />
                      <AvatarFallback>
                        <User className="w-12 h-12" />
                      </AvatarFallback>
                    </Avatar>
                    <Button className="mt-6 mb-10 md:mt-0">
                      Change Avatar
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications">
                  <div className="grid gap-4 md:grid-cols-2">
                    {["messages", "mentions", "updates"].map((key) => (
                      <div
                        key={key}
                        className="flex items-center justify-between space-x-4"
                      >
                        <div className="space-y-1">
                          <Label htmlFor={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                            Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {key === "messages"
                              ? "Receive notifications for new messages."
                              : key === "mentions"
                              ? "Receive notifications when you're mentioned."
                              : "Receive notifications about app updates."}
                          </p>
                        </div>
                        <Switch
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
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="personalization">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label>Archive Chat History</Label>
                        <p className="text-sm text-muted-foreground">
                          Download and save your chat history.
                        </p>
                      </div>
                      <Button>
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </Button>
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label>Clear Cache</Label>
                        <p className="text-sm text-muted-foreground">
                          Clear local chat cache and temporary data.
                        </p>
                      </div>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoDeleteMessages">
                          Auto-delete Messages
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically delete messages after 30 days.
                        </p>
                      </div>
                      <Switch
                        id="autoDeleteMessages"
                        checked={autoDeleteMessages}
                        onCheckedChange={setAutoDeleteMessages}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </TooltipProvider>
  );
}
