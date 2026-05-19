"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { GraduationCap, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { googleLogin } from "@/lib/auth";

function SignupComp() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    setError("");

    if (!email || !password || !firstName || !lastName || !username) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    const data = JSON.stringify({
      email: email,
      password: password,
      // Note: First Name, Last Name, and Username are captured but the backend only expects email/password currently. 
      // Ready for backend update.
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/api/v1/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0e0e11] font-sans text-white py-24 relative overflow-hidden">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#bdf365]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md rounded-2xl bg-[#151518]/80 backdrop-blur-xl shadow-2xl border border-white/5 overflow-hidden p-8 sm:p-10 relative z-10 mt-8 transition-all duration-300">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 bg-[#bdf365]/10 rounded-xl flex items-center justify-center mb-4">
            <GraduationCap className="h-6 w-6 text-[#bdf365]" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Join CampusLink</h1>
          <p className="text-sm text-[#a1a1aa]">Create an account to connect with peers</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={googleLogin}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-white/10 transition-all mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FcGoogle className="h-5 w-5" />
          Continue with Google
        </button>

        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative bg-[#151518] px-3 text-xs text-[#a1a1aa] uppercase tracking-wider font-semibold">or</div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#a1a1aa]">First Name</label>
              <input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setError(""); }}
                disabled={isLoading}
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white shadow-inner placeholder:text-[#52525b] focus:border-[#bdf365] focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-[#bdf365] transition-all disabled:opacity-50"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#a1a1aa]">Last Name</label>
              <input
                type="text"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setError(""); }}
                disabled={isLoading}
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white shadow-inner placeholder:text-[#52525b] focus:border-[#bdf365] focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-[#bdf365] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#a1a1aa]">Username</label>
            <input
              type="text"
              placeholder="john_smith23"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              disabled={isLoading}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white shadow-inner placeholder:text-[#52525b] focus:border-[#bdf365] focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-[#bdf365] transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#a1a1aa]">Email</label>
            <input
              type="email"
              placeholder="hello@university.edu"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              disabled={isLoading}
              className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white shadow-inner placeholder:text-[#52525b] focus:border-[#bdf365] focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-[#bdf365] transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#a1a1aa]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Strong Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                disabled={isLoading}
                onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
                className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-white shadow-inner placeholder:text-[#52525b] focus:border-[#bdf365] focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-[#bdf365] transition-all pr-10 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 flex items-center pr-3 disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff className="size-4 text-[#52525b] hover:text-[#a1a1aa] transition-colors" />
                ) : (
                  <Eye className="size-4 text-[#52525b] hover:text-[#a1a1aa] transition-colors" />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignup}
          disabled={isLoading}
          className="mb-4 flex w-full justify-center items-center rounded-lg bg-[#bdf365] px-4 py-3.5 text-sm font-bold text-black shadow-[0_0_20px_rgba(189,243,101,0.15)] hover:bg-[#aee654] hover:shadow-[0_0_30px_rgba(189,243,101,0.25)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="text-center">
          <p className="text-xs text-[#a1a1aa] mt-8 pt-6 border-t border-white/5">
            Already have an account? <Link href="/login" className="font-semibold text-white hover:text-[#bdf365] underline decoration-white/30 hover:decoration-[#bdf365]/50 underline-offset-2 transition-colors">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupComp;
