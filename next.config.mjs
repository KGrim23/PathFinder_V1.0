// next.config.mjs
import nextPwa from "next-pwa";

const pwaConfig = {
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
};

// Export the PWA configuration directly
export default nextPwa(pwaConfig);
