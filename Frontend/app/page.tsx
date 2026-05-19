"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Newspaper, Users, Rocket, MessageCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0e0e11] text-white flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center text-center px-6 pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#bdf365]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-[#bdf365] animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-gray-300">The Ultimate University Network</span>
        </div> */}

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-8 max-w-5xl leading-[1.1]">
          Your Campus, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bdf365] to-emerald-400">
            Connected.
          </span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed">
          Bridging the gap between professional networking and campus life. Discover news, share projects, and meet peers from diverse cultures across your university.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto bg-[#bdf365] text-black hover:bg-[#aee654] text-lg font-bold px-10 py-7 rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(189,243,101,0.3)]"
            >
              Join the Network <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-transparent text-white border-white/20 hover:bg-white/5 text-lg font-semibold px-10 py-7 rounded-full transition-all"
            >
              Log In
            </Button>
          </Link>
        </div>
      </section>

      {/* Social Proof / Hero Image Break */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-24 lg:pb-32 relative z-10">
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-transparent to-transparent z-10" />
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Students collaborating"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-[#151518] border-y border-white/5 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">Everything you need in one place.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We combine the best parts of LinkedIn and Instagram, tailored specifically for university students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#1c1d21] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="h-14 w-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Newspaper className="h-7 w-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Campus News</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Stay in the loop with the latest events, announcements, and college news happening around you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#1c1d21] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="h-14 w-14 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Meet Diverse Peers</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connect with students from different regions, states, and cultures. Expand your horizons.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#1c1d21] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="h-14 w-14 bg-[#bdf365]/10 rounded-xl flex items-center justify-center mb-6">
                <Rocket className="h-7 w-7 text-[#bdf365]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Share Projects</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Showcase your work, find collaborators for your next big idea, and build a stunning portfolio.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#1c1d21] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="h-14 w-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="h-7 w-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Chat</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Instantly message friends, classmates, and project partners securely and seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Showcase Section */}
      <section className="w-full py-24 lg:py-32 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-6xl font-black mb-8">Experience college, <span className="italic text-gray-400">together.</span></h2>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
          University is more than just classes. It's about the people you meet and the connections you build.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <div className="relative rounded-2xl overflow-hidden col-span-2 row-span-2 border border-white/10">
            <Image src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Students" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <Image src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Students" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Students" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="relative rounded-2xl overflow-hidden col-span-2 border border-white/10">
            <Image src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Students" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full relative py-24 lg:py-32 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[#bdf365]/5 z-0" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to expand your campus experience?</h2>
          <Link href="/signup">
            <Button
              className="bg-[#bdf365] text-black hover:bg-[#aee654] text-xl font-bold px-12 py-8 rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(189,243,101,0.2)]"
            >
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CampusLink. All rights reserved.</p>
      </footer>
    </div>
  );
}
