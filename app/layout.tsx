import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "./components/ThemeContext";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Footer from "./components/Footer";

export const metadata = {
  title: "Path Finder",
  description: "Your AI Career Advisor and counsellor",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no"
          />
        </head>

        <body className="overscroll-x-none font-sans font-light">
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
