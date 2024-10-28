import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Also cover images served by Unsplash
      },
      {
        protocol: "https",
        hostname: "cdn.minicoursegenerator.com", // Added domain for Mini Course images
      },
    ],
  },
  // other Next.js config options can go here
};

const config = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})(nextConfig);

export default config;
