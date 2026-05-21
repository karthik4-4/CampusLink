"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Navbar() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 w-full bg-[#0e0e11]/90 backdrop-blur-md border-b border-white/5">
      {/* Left Side: Navigation Links */}
      <nav className="hidden md:flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" className="text-[#bdf365] hover:bg-transparent hover:text-[#bdf365] text-sm font-semibold tracking-wide">
            Home
          </Button>
        </Link>
        <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-transparent text-sm font-semibold tracking-wide cursor-default">
          Community
        </Button>
        <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-transparent text-sm font-semibold tracking-wide cursor-default">
          Contact
        </Button>
      </nav>

      {/* Mobile menu fallback for left side */}
      <div className="md:hidden flex items-center">
        <Link href="/">
          <Button variant="ghost" className="text-[#bdf365] text-sm font-semibold px-2">
            Home
          </Button>
        </Link>
      </div>

      {/* Middle: App Name & Logo */}
      <Link href="/" className="flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity">
        <GraduationCap className="h-6 w-6 text-[#bdf365]" />
        <div className="text-xl font-black tracking-tighter text-white uppercase">CampLinkkkkkkkkkkk</div>
      </Link>

      {/* Right Side: Auth Buttons */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Link href="/login">
          <Button
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-white/5 text-sm font-semibold tracking-wide transition-colors"
          >
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            className="bg-transparent border border-[#bdf365] text-[#bdf365] hover:bg-[#bdf365] hover:text-black font-semibold rounded-md px-4 sm:px-6 transition-all"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  );
}
