"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "../components/ThemeContext";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { isDarkMode, toggleDarkMode } = useTheme(); // Use ThemeContext

  // Effect to toggle dark mode class
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={` ${isDarkMode ? "dark" : ""}`}>
      <div className="flex space-x-6 p-4 items-center justify-center">
        <Button
          variant={activeTab === "general" ? "default" : "ghost"}
          onClick={() => setActiveTab("general")}
          className="flex-1"
        >
          General
        </Button>
        <Button
          variant={activeTab === "goals-focus" ? "default" : "ghost"}
          onClick={() => setActiveTab("goals-focus")}
          className="flex-1"
        >
          Goals & Focus
        </Button>
        <Button
          variant={activeTab === "privacy" ? "default" : "ghost"}
          onClick={() => setActiveTab("privacy")}
          className="flex-1"
        >
          Privacy
        </Button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center mb-4">
        <Switch
          id="dark-mode-toggle"
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
        />
        {/* <Label htmlFor="dark-mode-toggle" className="ml-2">
          Dark Mode
        </Label> */}
      </div>

      {activeTab === "general" && (
        <div className="space-y-6 p-4">
          <h2 className="text-3xl font-semibold">General Settings</h2>

          <Card className="border-none">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-400">
                    Receive notifications about new messages and updates via
                    email
                  </p>
                </div>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-400">
                    Receive push notifications on your device for important
                    updates
                  </p>
                </div>
                <Switch id="push-notifications" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "goals-focus" && (
        <div className="space-y-6 p-4">
          <h2 className="text-3xl font-semibold">Goals & Focus Settings</h2>

          <Card className="border-none">
            <CardHeader>
              <CardTitle>Personal Goals</CardTitle>
              <CardDescription>
                Select the goals you want to focus on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "Improve Communication",
                  "Manage Stress",
                  "Boost Confidence",
                  "Career Development",
                  "Work-Life Balance",
                ].map((goal) => (
                  <Button
                    key={goal}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none">
            <CardHeader>
              <CardTitle>Soft Skills Focus</CardTitle>
              <CardDescription>
                Choose the soft skills you want to improve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  "Active Listening",
                  "Empathy",
                  "Conflict Resolution",
                  "Time Management",
                  "Leadership",
                ].map((skill) => (
                  <Button
                    key={skill}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "privacy" && (
        <div className="space-y-6 p-4">
          <h2 className="text-3xl font-semibold">Privacy Settings</h2>

          <Card className="border-none">
            <CardHeader>
              <CardTitle>Data Collection</CardTitle>
              <CardDescription>
                Information about our data collection practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                By using this app, you accept our terms that we will collect and
                use your interactions with the AI for training purposes. This
                helps us improve our services and provide better assistance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none">
            <CardHeader>
              <CardTitle>Chat History</CardTitle>
              <CardDescription>
                Manage your chat history settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="save-chat-history" />
                <Label htmlFor="save-chat-history">Save chat history</Label>
              </div>
              <Button variant="outline">Clear Chat History</Button>
              <Button variant="outline">Download Chat History</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
