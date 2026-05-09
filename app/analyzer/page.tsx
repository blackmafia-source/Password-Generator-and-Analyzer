'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { analyzePasswordStrength } from '@/lib/password-analyzer';
import { ArrowLeft, Check, X } from 'lucide-react';

export default function AnalyzerPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const analysis = password ? analyzePasswordStrength(password) : null;

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'strong':
        return 'text-green-500';
      case 'very-strong':
        return 'text-accent';
      default:
        return 'text-gray-400';
    }
  };

  const getStrengthBorder = (strength: string) => {
    switch (strength) {
      case 'weak':
        return 'border-red-500/50';
      case 'medium':
        return 'border-yellow-500/50';
      case 'strong':
        return 'border-green-500/50';
      case 'very-strong':
        return 'border-accent';
      default:
        return 'border-accent/30';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <h1 className="text-3xl md:text-4xl font-bold text-accent neon-glow">STRENGTH ANALYZER</h1>
            </div>
            <p className="text-sm text-gray-400">Evaluate your password security with detailed analysis</p>
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

        {/* Input section */}
        <div className="border border-accent/30 rounded-sm p-6 neon-border space-y-4">
          <div className="text-xs font-bold text-accent mb-4 tracking-widest">INPUT PROTOCOL</div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-300 font-mono">Enter password to analyze:</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password here..."
                className="w-full bg-muted border border-accent/30 text-accent placeholder-gray-600 px-4 py-3 rounded-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 font-mono"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition-colors"
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>
        </div>

        {/* Analysis section */}
        {analysis && (
          <div className={`border rounded-sm p-6 space-y-6 ${getStrengthBorder(analysis.strength)} neon-border`}>
            <div className="text-xs font-bold text-accent mb-4 tracking-widest">SECURITY ANALYSIS</div>

            {/* Strength indicator */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-mono">Strength Rating:</span>
                <span className={`font-bold text-lg ${getStrengthColor(analysis.strength)} uppercase tracking-wider`}>
                  {analysis.strength}
                </span>
              </div>
              <div className="w-full bg-muted rounded-sm overflow-hidden h-2 border border-accent/20">
                <div
                  className={`h-full transition-all duration-300 ${
                    analysis.strength === 'weak'
                      ? 'bg-red-500 w-1/4'
                      : analysis.strength === 'medium'
                      ? 'bg-yellow-500 w-1/2'
                      : analysis.strength === 'strong'
                      ? 'bg-green-500 w-3/4'
                      : 'bg-accent w-full'
                  }`}
                />
              </div>
              <div className="text-xs text-gray-400 flex justify-between">
                <span>Score: {analysis.score}/100</span>
                <span>Length: {password.length}</span>
              </div>
            </div>

            {/* Character analysis */}
            <div className="space-y-2">
              <div className="text-sm font-bold text-accent">CHARACTER COMPOSITION</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-sm">
                  {analysis.analysis.uppercase ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-300">Uppercase (A-Z)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {analysis.analysis.lowercase ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-300">Lowercase (a-z)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {analysis.analysis.numbers ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-300">Numbers (0-9)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {analysis.analysis.specialChars ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-300">Special Chars</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {analysis.analysis.length ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-300">Length (8+)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {analysis.analysis.noRepetition ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-gray-300">No Repetition</span>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            {analysis.suggestions.length > 0 && (
              <div className="space-y-2 border-t border-accent/20 pt-4">
                <div className="text-sm font-bold text-yellow-500">IMPROVEMENT SUGGESTIONS</div>
                <ul className="space-y-1">
                  {analysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex gap-2">
                      <span className="text-accent">→</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.suggestions.length === 0 && (
              <div className="border border-green-500/30 rounded-sm p-3 text-center">
                <p className="text-green-500 font-bold">MAXIMUM SECURITY ACHIEVED</p>
                <p className="text-xs text-gray-400 mt-1">This password meets all security criteria</p>
              </div>
            )}
          </div>
        )}

        {!password && (
          <div className="border border-accent/30 rounded-sm p-8 text-center neon-border">
            <div className="text-gray-400 space-y-2">
              <p className="text-sm">Enter a password above to begin analysis</p>
              <p className="text-xs">Real-time security assessment with detailed feedback</p>
            </div>
          </div>
        )}

        {/* Status footer */}
        <div className="border-t border-accent/20 pt-4 text-center">
          <p className="text-xs text-gray-400 font-mono">
            <span className="text-accent">ANALYSIS TYPE:</span> Real-time | <span className="text-accent">PRIVACY:</span> No data stored
          </p>
        </div>
      </div>
    </div>
  );
}
