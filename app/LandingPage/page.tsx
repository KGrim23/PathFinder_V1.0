"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "../components/ThemeContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Footer from "../components/Footer";
import {
  Brain,
  CheckCircle,
  GraduationCap,
  LineChart,
  MessageCircleMore,
  Users,
} from "lucide-react";

export default function LandingPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();
  const [startChat, setStartChat] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStartChat = () => {
    setStartChat(true);
    router.push("/chats"); // This will navigate to the 'Chats' page
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

          <main
            className={`flex-1 mt-16 lg:mt-2 mb-20 ${isDarkMode ? "dark" : ""}`}
          >
            <section
              id="about"
              className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
            >
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                      Welcome to PathFinder AI
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 text-lg md:text-xl dark:text-gray-400">
                      Get personalized career guidance with our AI-powered
                      advisor. Based on your skills and interests, it suggests
                      tailored career paths, university courses, and skill
                      development tips.
                    </p>
                  </div>
                  {/* Button Section */}
                  <div className="flex flex-col items-center justify-center mt-6 lg:mt-20">
                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={handleStartChat}
                      className={`mt-10 gap-1.5 text-lg lg:text-xl lg:mt-4 lg:p-6 bg-zinc-800 rounded-full ${
                        isDarkMode ? "text-white" : "text-white"
                      }`}
                    >
                      Start Chat <MessageCircleMore />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section
              id="features"
              className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black"
            >
              <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                  Key Features
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card className="dark:border-gray-800 shadow-zinc-600 rounded-xl">
                    <CardHeader>
                      <Brain className="h-6 w-6 mb-2" />
                      <CardTitle>Personalized Guidance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Receive an advice on career paths based on your unique
                        skills and interests.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="dark:border-gray-800 shadow-zinc-700 rounded-xl">
                    <CardHeader>
                      <GraduationCap className="h-6 w-6 mb-2" />
                      <CardTitle>Course Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Get suggestions for university courses that align with
                        your career goals.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="dark:border-gray-800 shadow-zinc-700 rounded-xl">
                    <CardHeader>
                      <LineChart className="h-6 w-6 mb-2" />
                      <CardTitle>Skill Development</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Receive tips on how to develop the skills needed for
                        your chosen career path.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
            <section id="benefits" className="w-full py-12 md:py-24 lg:py-32">
              <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                  Benefits of Career Guidance
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    "Make more informed decisions",
                    "Achieve new goals",
                    "Develop career-planning skills",
                    "Become more confident about post-16 choices",
                  ].map((benefit, index) => (
                    <Card
                      key={index}
                      className="dark:border-neutral-600 rounded-xl"
                    >
                      <CardContent className="pt-6">
                        <CheckCircle className="h-6 w-6 mb-2 text-green-500" />
                        <p>{benefit}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black">
              <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                  How a Career Advisor Can Help
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Exploring career options",
                    "Getting industry information",
                    "Getting advice on specific jobs",
                    "Developing a CV",
                    "Understanding the job market",
                    "Identifying skills",
                  ].map((help, index) => (
                    <Card
                      key={index}
                      className="dark:border-neutral-600 rounded-xl"
                    >
                      <CardContent className="pt-6">
                        <Users className="h-6 w-6 mb-2" />
                        <p>{help}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
            <section id="resources" className="w-full py-12 md:py-24 lg:py-32">
              <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                  Additional Career Resources
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  <Card className="dark:border-gray-800 shadow-zinc-700 rounded-xl">
                    <CardHeader>
                      <CardTitle>National Careers Service</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        For career advice, you can contact the National Careers
                        Service:
                      </p>
                      <p className="mt-2">Phone: 0800 100 900</p>
                      <p>
                        Website:{" "}
                        <a
                          href="https://nationalcareers.service.gov.uk"
                          className="text-blue-500 font-medium hover:underline"
                        >
                          GOV.UK Careers
                        </a>
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="dark:border-gray-800 shadow-zinc-700 rounded-xl">
                    <CardHeader>
                      <CardTitle>Other Helpful Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside space-y-2 pl-4 font-medium">
                        <li>
                          <a
                            href="https://www.reed.co.uk/career-advice"
                            className="text-blue-500 hover:underline"
                          >
                            Reed: Career Advice Resources
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.indeed.com/career-advice"
                            className="text-blue-500 hover:underline"
                          >
                            Indeed: Career Advice
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.careersandenterprise.co.uk"
                            className="text-blue-500 hover:underline"
                          >
                            The Careers & Enterprise Company
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.gatsby.org.uk/education/focus-areas/good-career-guidance"
                            className="text-blue-500 hover:underline"
                          >
                            Gatsby: Good Career Guidance
                          </a>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Ready to Plan Your Future?
                    </h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      Start your journey with PathFinder AI and discover the
                      perfect career path for you.
                    </p>
                  </div>
                  <div className="space-x-4">
                    <Button
                      size="lg"
                      className={`mt-10 gap-1.5 text-md lg:text-xl lg:mt-4 lg:p-6 bg-zinc-800 rounded-xl ${
                        isDarkMode ? "text-white" : "text-white"
                      }`}
                    >
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </main>
          {/* <Footer /> */}
        </div>
      </div>
    </TooltipProvider>
  );
}
