import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  Compass,
  GraduationCap,
  LineChart,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <Compass className="h-6 w-6 mr-2" />
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#about"
          >
            About
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            New Chat
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#benefits"
          >
            Save Chats
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#resources"
          >
            Settings
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to PathFinder AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get personalized career guidance with our AI-powered advisor.
                  Based on your skills and interests, it suggests tailored
                  career paths, university courses, and skill development tips.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 rounded-full"
                >
                  Ready for a Chat
                  {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Brain className="h-6 w-6 mb-2" />
                  <CardTitle>Personalized Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Receive tailored career paths based on your unique skills
                    and interests.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <GraduationCap className="h-6 w-6 mb-2" />
                  <CardTitle>Course Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Get suggestions for university courses that align with your
                    career goals.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <LineChart className="h-6 w-6 mb-2" />
                  <CardTitle>Skill Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Receive tips on how to develop the skills needed for your
                    chosen career path.
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
                <Card key={index}>
                  <CardContent className="pt-6">
                    <CheckCircle className="h-6 w-6 mb-2 text-green-500" />
                    <p>{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
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
                "Searching and applying for jobs",
                "Applying for training schemes",
                "Identifying skills",
              ].map((help, index) => (
                <Card key={index}>
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
              <Card>
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
              <Card>
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Plan Your Future?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Start your journey with PathFinder AI and discover the perfect
                  career path for you.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg">
                  Start a chat 💬
                  {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 PathFinder AI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </a>
        </nav>
      </footer>
    </div>
  );
}
