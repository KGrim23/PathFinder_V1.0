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
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", // Allow images from Clerk
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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Feature-Policy",
            value: "geolocation 'self'; microphone 'none'",
          },
        ],
      },
    ];
  },
};

const config = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable PWA in development for easier debugging
})(nextConfig);

export default config;
