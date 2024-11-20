"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Compass } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-gray-700 text-white overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle farthest-corner at -8.9% 51.2%, rgba(255,124,0,1) 0%, rgba(255,124,0,1) 15.9%, rgba(255,163,77,1) 15.9%, rgba(255,163,77,1) 24.4%, rgba(19,30,37,1) 24.5%, rgba(19,30,37,1) 66%)",
      }}
    >
      {/* <div className="absolute inset-0 z-0">
        <Image src="/pathfinder.png" alt="logo" width={400} height={400} />
      </div> */}

      <div className="z-10 w-full max-w-md px-4 space-y-8">
        <div className="flex items-center justify-center">
          <Image src="/sidebar.png" alt="logo" width={150} height={100} />
        </div>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 rounded-xl text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 rounded-xl text-base"
            />
          </div>

          <div className="space-y-2">
            <Link href="/LandingPage">
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-200 rounded-xl"
              >
                Log in
              </Button>
            </Link>
          </div>
        </form>
        <div className="text-center">
          <Button
            variant="link"
            className="text-sm text-gray-400 hover:text-white"
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
// "use client";
// import Link from "next/link";
// import React from "react";

// const LandingPage: React.FC = () => {
//   return (
//     <div className="relative flex flex-col space-y-4 items-center justify-center min-h-screen $">
//       {/* Background Image Section */}
//       <div className="relative w-full min-h-screen">
//         <div className="absolute inset-0 bg-black"></div>

//         {/* Content Over the Image */}
//         <div className="absolute inset-0 flex flex-col justify-between items-center z-10">
//           <div className="flex flex-col items-center space-x-4 gap-4 m-auto">
//             <h1
//               className="text-5xl mt-4 md:text-6xl font-semibold"
//               style={{
//                 background:
//                   "linear-gradient(to right, #00aaff, #aa00ff, #00ff6a, #ff003c)",
//                 WebkitBackgroundClip: "text",
//                 backgroundClip: "text",
//                 color: "transparent",
//               }}
//             >
//               PathFinder
//             </h1>

//             <strong className="text-white text-xl md:text-2xl text-center p-6">
//               {" "}
//               AI powered Career Advisor for your Brighter Future ✨
//             </strong>
//           </div>

//           {/* Sign-up Button and Footer Links at the Bottom */}
//           <div className="mb-16 flex flex-col items-center">
// <Link
//   href="/LandingPage"
//   className="px-6 py-1 text-md bg-grey-600 text-white border-2 border-white rounded-xl hover:bg-blue-700 transition"
// >
//   Log In
// </Link>

//             {/* Footer Links */}
//             <div className="mt-4 flex space-x-6 text-sm text-white">
//               <Link href="/privacy-policy" className="hover:underline">
//                 Privacy Policy
//               </Link>
//               <Link href="/terms" className="hover:underline">
//                 Terms of Service
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
