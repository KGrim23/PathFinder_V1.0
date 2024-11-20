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
  // Disable CSS minification during development to prevent errors
  webpack(config, { isServer }) {
    if (!isServer) {
      config.optimization.minimize = false; // Disable minification in development
    }
    return config;
  },
  reactStrictMode: true, // Always a good practice to have strict mode enabled
  // Other Next.js settings...
};

const config = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable PWA in development for easier debugging
})(nextConfig);

export default config;
