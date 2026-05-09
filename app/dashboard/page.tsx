'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PasswordControls } from '@/components/password-controls';
import { PasswordDisplay } from '@/components/password-display';
import { generateMultiplePasswords, PasswordOptions } from '@/lib/password-generator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Dashboard() {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = (options: PasswordOptions, count: number) => {
    setIsLoading(true);
    try {
      const newPasswords = generateMultiplePasswords(options, count);
      setPasswords(newPasswords);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <h1 className="text-3xl md:text-4xl font-bold text-accent neon-glow">GENERATOR PROTOCOL</h1>
            </div>
            <p className="text-sm text-gray-400">Create custom passwords with advanced security parameters</p>
          </div>
          <Link href="/">
            <Button 
              variant="outline"
              size="sm"
              className="border-accent text-accent hover:bg-accent/10 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              RETURN
            </Button>
          </Link>
        </div>

        {/* Main content grid */}
        <div className="grid md:grid-cols-5 gap-6">
          {/* Controls section */}
          <div className="md:col-span-2 space-y-4">
            <div className="border border-accent/30 rounded-sm p-4 neon-border">
              <div className="text-xs font-bold text-accent mb-4 tracking-widest">CONFIG PANEL</div>
              <PasswordControls onGenerate={handleGenerate} isLoading={isLoading} />
            </div>
          </div>

          {/* Display section */}
          <div className="md:col-span-3">
            <div className="border border-accent/30 rounded-sm p-4 neon-border">
              <div className="text-xs font-bold text-accent mb-4 tracking-widest">GENERATED OUTPUT</div>
              <PasswordDisplay passwords={passwords} />
            </div>
          </div>
        </div>

        {/* Status footer */}
        <div className="border-t border-accent/20 pt-4 text-center">
          <p className="text-xs text-gray-400 font-mono">
            <span className="text-accent">STATUS:</span> All processing local | <span className="text-accent">SECURITY:</span> Military-grade | <span className="text-accent">LOG:</span> None recorded
          </p>
        </div>
      </div>
    </div>
  );
}
