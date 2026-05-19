"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomeComp() {
  const router = useRouter();

  const login = () => {
    router.push("/login");
  };

  const signup = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tight">OurApp</div>
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-transparent text-sm font-medium tracking-wide uppercase"
            onClick={login}
          >
            Log in
          </Button>
          <Button
            variant="outline"
            className="bg-transparent text-white border-gray-700 hover:bg-gray-800 hover:text-white"
            onClick={signup}
          >
            Sign Up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center mt-[-10vh]">
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6">
          Connect with People
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          Join our community today and start connecting with people<br className="hidden md:block" />
          around the world securely and seamlessly.
        </p>

        <Button
          className="bg-white text-black hover:bg-gray-200 text-lg font-bold px-10 py-7 rounded-full"
          onClick={signup}
        >
          Get Started for Free
        </Button>
      </main>
    </div>
  );
}
