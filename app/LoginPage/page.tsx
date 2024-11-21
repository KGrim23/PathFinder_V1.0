import React from "react";
import { ClerkProvider, SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <ClerkProvider>
      <div
        className="relative min-h-screen flex flex-col items-center justify-center bg-gray-700 text-white overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle farthest-corner at -8.9% 51.2%, rgba(255,124,0,1) 0%, rgba(255,124,0,1) 15.9%, rgba(255,163,77,1) 15.9%, rgba(255,163,77,1) 24.4%, rgba(19,30,37,1) 24.5%, rgba(19,30,37,1) 66%)",
        }}
      >
        <div className="z-10 w-full max-w-md px-4 space-y-8">
          <SignIn
            routing="hash" // Add this line
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-white text-black hover:bg-gray-200 rounded-xl",
                card: "bg-gray-900 border-gray-700",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-400",
                socialButtonsBlockButton:
                  "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700",
                formFieldInput:
                  "bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-xl",
                footerActionLink: "text-gray-400 hover:text-white",
              },
            }}
            afterSignInUrl="/LandingPage"
          />
        </div>
      </div>
    </ClerkProvider>
  );
}
