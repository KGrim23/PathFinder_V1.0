import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // other Next.js config options can go here
};

const config = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})(nextConfig);

export default config;
