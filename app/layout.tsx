import Image from "next/image";
import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";
import { ReactNode } from "react"; // Import ReactNode for typing children

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Lumny App",
  description: "AI Coach",
};

interface RootLayoutProps {
  children: ReactNode; // Define the type for children
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#317EFB" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-screen bg-white text-black text-md flex flex-col">
        {/* Main content area with padding to avoid being covered by the footer */}
        <main className="flex-grow flex flex-col justify-center items-center w-full mb-16 max-w-xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
