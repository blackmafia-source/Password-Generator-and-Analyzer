'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-8 p-4 md:p-8">
      {/* Grid background effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
        {/* Main title with glitch effect */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold glitch" data-text="SECURE SHIELD">
            SECURE SHIELD
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 font-mono">
            Advanced Password Security System
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4 text-gray-300">
          <p className="text-base md:text-lg leading-relaxed">
            Generate unbreakable passwords and analyze their strength with military-grade security protocols. 
            Your passwords, your rules, zero compromises.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
            <div className="border-l-2 border-accent pl-4">
              <p className="font-bold text-accent">GENERATE</p>
              <p className="text-sm text-gray-400">Create custom passwords instantly</p>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <p className="font-bold text-accent">ANALYZE</p>
              <p className="text-sm text-gray-400">Get detailed security feedback</p>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <p className="font-bold text-accent">SECURE</p>
              <p className="text-sm text-gray-400">All processing stays local</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/dashboard">
            <Button 
              size="lg"
              className="bg-accent text-background hover:bg-accent/90 font-bold text-lg neon-glow"
            >
              ENTER SYSTEM
            </Button>
          </Link>
          <Link href="/analyzer">
            <Button 
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent/10 font-bold text-lg"
            >
              ANALYZE PASSWORD
            </Button>
          </Link>
        </div>

        {/* Features list */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs md:text-sm text-gray-400 pt-8 border-t border-accent/20">
          <div className="text-center">
            <div className="text-accent font-bold">ZERO LOG</div>
            <div>No tracking</div>
          </div>
          <div className="text-center">
            <div className="text-accent font-bold">INSTANT</div>
            <div>Real-time</div>
          </div>
          <div className="text-center">
            <div className="text-accent font-bold">CUSTOM</div>
            <div>Full control</div>
          </div>
          <div className="text-center">
            <div className="text-accent font-bold">LOCAL</div>
            <div>Private</div>
          </div>
        </div>
      </div>

      {/* Animated accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
    </main>
  );
}
