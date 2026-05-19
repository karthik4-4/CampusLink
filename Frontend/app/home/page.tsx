"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GraduationCap, LogOut } from "lucide-react";

interface ProfileProps {
  id: number;
  googleId: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [profile, setProfile] = React.useState<ProfileProps | null>(null);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/api/v1/googleauth/me",
      headers: {
        Authorization: `${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen relative w-full flex flex-col overflow-hidden bg-[#0e0e11] font-sans text-white">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 w-full bg-[#0e0e11]/90 backdrop-blur-md border-b border-white/5">
        
        {/* Left Side: App Name & Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <GraduationCap className="h-6 w-6 text-[#bdf365]" />
          <div className="text-xl font-black tracking-tighter text-white uppercase hidden sm:block">CampusLink</div>
        </div>

        {/* Right Side: Profile & Logout */}
        <div className="flex items-center gap-4">
          {profile?.name && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-sm font-semibold text-gray-200 hidden sm:block">
                Hi, {profile.name}
              </span>
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.name || "User avatar"}
                  width={28}
                  height={28}
                  className="rounded-full ring-2 ring-[#bdf365]/30"
                  unoptimized
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#bdf365]/20 flex items-center justify-center text-[#bdf365] font-bold text-xs">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )}
          
          <Button
            variant="ghost"
            onClick={logout}
            className="text-gray-300 hover:text-white hover:bg-white/5 text-sm font-semibold tracking-wide transition-colors flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-0 px-4 mt-20">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#bdf365]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="text-center max-w-3xl space-y-8 transform transition-all duration-700 hover:scale-[1.02]">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-2 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[#bdf365] animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">Dashboard Access</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white">
            We will be there <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bdf365] to-emerald-400">
              soon.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
            We're currently crafting a beautiful new experience for you.
            Check back later to see what we've been building.
          </p>
        </div>
      </div>
    </div>
  );
}
