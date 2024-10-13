import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        <Button
          variant={activeTab === "general" ? "default" : "ghost"}
          onClick={() => setActiveTab("general")}
        >
          General
        </Button>
        <Button
          variant={activeTab === "ai-personality" ? "default" : "ghost"}
          onClick={() => setActiveTab("ai-personality")}
        >
          AI Personality
        </Button>
        <Button
          variant={activeTab === "goals-focus" ? "default" : "ghost"}
          onClick={() => setActiveTab("goals-focus")}
        >
          Goals & Focus
        </Button>
        <Button
          variant={activeTab === "privacy" ? "default" : "ghost"}
          onClick={() => setActiveTab("privacy")}
        >
          Privacy
        </Button>
      </div>

      {/* General Settings Tab */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">General Settings</h2>
          <Card>
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
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about new messages and updates via
                    email
                  </p>
                </div>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications on your device for important
                    updates
                  </p>
                </div>
                <Switch id="push-notifications" />
              </div>
            </CardContent>
          </Card>
          {/* Additional General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Customize the appearance of the application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="theme">Select Theme</Label>
                <Select>
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Personality Settings Tab */}
      {activeTab === "ai-personality" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">AI Personality Settings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Conversation Style</CardTitle>
              <CardDescription>
                Choose how the AI assistant communicates with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="conversation-style">
                  Select Conversation Style
                </Label>
                <Select>
                  <SelectTrigger id="conversation-style">
                    <SelectValue placeholder="Select a conversation style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supportive">
                      Supportive and Encouraging
                    </SelectItem>
                    <SelectItem value="analytical">
                      Analytical and Objective
                    </SelectItem>
                    <SelectItem value="motivational">
                      Motivational and Inspiring
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Goals & Focus Settings Tab */}
      {activeTab === "goals-focus" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Goals & Focus Settings</h2>
          <Card>
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
                  <Button key={goal} variant="outline" size="sm">
                    {goal}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Privacy Settings Tab */}
      {activeTab === "privacy" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Privacy Settings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Data Collection</CardTitle>
              <CardDescription>
                Control how we collect and use your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch id="data-collection" />
                <Label htmlFor="data-collection">
                  Allow data collection for service improvement
                </Label>
              </div>
            </CardContent>
          </Card>
          <Card>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>
                Manage permissions for third-party services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="calendar-integration" />
                  <Label htmlFor="calendar-integration">
                    Allow calendar integration
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="social-media-integration" />
                  <Label htmlFor="social-media-integration">
                    Allow social media integration
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
          <Button variant="destructive">Delete All Data</Button>
        </div>
      )}
    </div>
  );
}
