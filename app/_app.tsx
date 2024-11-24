import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "PathFinder - AI Advisor for Personal and Professional Growth",
  description:
    "PathFinder is an AI-powered career advisor offering helps people make realistic choices about their education, training, and work. In schools, career advisors provide information, advice, and guidance to help students achieve their career ambitions..",
  keywords:
    "AI advisor, GCSE Options, A Level, University choices, career guidance, emotional intelligence, soft skills, professional growth, communication coaching, personal development, coaching AI",
  openGraph: {
    type: "website",
    url: "https://path-finder-pink.vercel.app/", // Replace with your site's URL
    title: "PathFinder - AI Advisor for Personal and Professional Growth",
    description:
      "Personalized AI coaching to boost your career and soft skills.",
    image: "https://www.pathfinder.com/og-image.jpg", // Replace with an image URL
    site_name: "PathFinder",
  },
  twitter: {
    card: "summary_large_image",
    title: "PathFinder - AI Advisor",
    description: "AI-powered advisor for personal and professional growth.",
    image: "https://www.pathfinder.com/twitter-image.jpg", // Replace with an image URL
  },
};

// Replace with your actual Clerk frontend API URL
const clerkFrontendApi = process.env.CLERK_FRONTEND_API || "";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/icon-192x192.png" sizes="192x192" />
        <link rel="icon" href="/icon-512x512.png" sizes="512x512" />
      </head>
      <body>
        <ClerkProvider publishableKey={clerkFrontendApi}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
