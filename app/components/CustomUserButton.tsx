import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useTheme } from "./ThemeContext";

export default function CustomUserButton() {
  const { user } = useUser();
  const { isDarkMode } = useTheme();

  const isSignedIn = !!user;
  const imageUrl = isSignedIn ? user.imageUrl : "/profile1.png";
  const fullName = isSignedIn ? user.fullName : "Guest";

  return (
    <button
      className={`flex items-center justify-start p-2 rounded-md${
        isDarkMode ? "text-white" : "text-black"
      }`}
      aria-label="User Profile Button"
    >
      <div>
        {" "}
        <Image
          src={imageUrl}
          alt={`${fullName}'s profile`}
          width={32}
          height={32}
          className="rounded-full mr-4 dark:text-white text-black"
          priority
        />
      </div>

      <div className="flex">
        <span className="text-base font-medium dark:text-white text-black">
          {fullName}
        </span>
      </div>
    </button>
  );
}
