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

const helpItems = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          'To create an account, click on the "Sign Up" button on the top right corner of the homepage. Fill in your details and follow the prompts to complete the registration process.',
      },
      {
        question: "What are the system requirements?",
        answer:
          "Our chat app works on most modern web browsers. For the best experience, we recommend using the latest version of Chrome, Firefox, Safari, or Edge.",
      },
      {
        question: "How do I start a new chat?",
        answer:
          'After logging in, click on the "New Chat" button on the left sidebar. You can then select a contact or enter a new email address to start a conversation.',
      },
    ],
  },
  {
    category: "Managing Your Account",
    questions: [
      {
        question: "How do I change my password?",
        answer:
          "Go to Settings > Security > Change Password. Enter your current password, then enter and confirm your new password.",
      },
      {
        question: "Can I change my username?",
        answer:
          "Yes, you can change your username in Settings > Profile. Keep in mind that changing your username will affect how others find you in the app.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "To delete your account, go to Settings > Account > Delete Account. Please note that this action is irreversible and will permanently delete all your data.",
      },
    ],
  },
  {
    category: "Terms and Privacy Policy",
    questions: [
      {
        question: "What data do you collect?",
        answer:
          "We collect basic account information, chat logs, and usage data to improve our service. For a full list, please refer to our Privacy Policy.",
      },
      {
        question: "How is my data protected?",
        answer:
          "We use industry-standard encryption for all data transmissions and storage. We also employ strict access controls and regular security audits.",
      },
      {
        question: "Can I request my data?",
        answer:
          "Yes, you can request a copy of your data under the GDPR and similar regulations. Go to Settings > Privacy > Request My Data to start the process.",
      },
    ],
  },
];

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { isDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = helpItems.flatMap((category) =>
    category.questions
      .filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((item) => ({ ...item, category: category.category }))
  );

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
        className={`grid min-h-screen w-full md:grid-cols-[auto_1fr] ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {!isMobile && <Sidebar />}
        <div className="flex flex-col h-full">
          <Navbar isMobile={isMobile} />

          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Help Center</h1>
            <div className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item, index) => (
                <Card
                  key={index}
                  className="flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{item.answer}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredItems.length === 0 && (
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
