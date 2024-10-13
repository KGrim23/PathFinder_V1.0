// app/layout.tsx (if using the new app directory)
import "./globals.css";

export const metadata = {
  title: "Lumny App",
  description: "AI Coach",
};

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
      <body>{children}</body>
    </html>
  );
}
