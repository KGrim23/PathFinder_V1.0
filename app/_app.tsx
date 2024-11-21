import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "PathFinder",
  description: "AI advisor",
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
