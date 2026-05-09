'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { calculateStrength } from '@/lib/password-generator';

interface PasswordDisplayProps {
  passwords: string[];
}

export function PasswordDisplay({ passwords }: PasswordDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (password: string, index: number) => {
    navigator.clipboard.writeText(password);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Weak':
        return 'text-red-500 border-red-500/50';
      case 'Medium':
        return 'text-yellow-500 border-yellow-500/50';
      case 'Strong':
        return 'text-green-500 border-green-500/50';
      default:
        return 'text-accent border-accent/50';
    }
  };

  if (passwords.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 font-mono">
          ► AWAITING PASSWORD GENERATION
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Configure parameters and execute GENERATE NOW
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-400 font-mono tracking-widest mb-4">
        {passwords.length} PASSWORD{passwords.length !== 1 ? 'S' : ''} GENERATED
      </div>
      {passwords.map((password, index) => {
        const strength = calculateStrength(password);
        return (
          <div
            key={index}
            className={`flex items-center justify-between gap-3 p-3 border rounded-sm transition-all ${getStrengthColor(strength)}`}
          >
            <div className="flex-1 space-y-1 min-w-0">
              <code className="block truncate text-accent font-mono text-sm bg-muted/50 px-2 py-1 rounded-sm border border-accent/20">
                {password}
              </code>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{password.length} chars</span>
                <span className="font-bold uppercase">{strength}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(password, index)}
              className="flex-shrink-0 border border-accent/30 hover:bg-accent/10"
            >
              {copiedIndex === index ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
