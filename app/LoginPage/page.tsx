"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
