'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PasswordOptions } from '@/lib/password-generator';

interface PasswordControlsProps {
  onGenerate: (options: PasswordOptions, count: number) => void;
  isLoading?: boolean;
}

export function PasswordControls({ onGenerate, isLoading }: PasswordControlsProps) {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialChars, setUseSpecialChars] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [count, setCount] = useState(1);

  const handleGenerate = () => {
    onGenerate(
      {
        length,
        useUppercase,
        useLowercase,
        useNumbers,
        useSpecialChars,
        excludeSimilar,
      },
      count
    );
  };

  const atLeastOneSelected = useUppercase || useLowercase || useNumbers || useSpecialChars;

  return (
    <div className="space-y-6">
      {/* Length Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="length" className="text-sm text-gray-300 font-mono">PASSWORD LENGTH</Label>
          <span className="text-lg font-bold text-accent">{length}</span>
        </div>
        <input
          id="length"
          type="range"
          min="4"
          max="128"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full h-2 bg-muted border border-accent/20 rounded-sm cursor-pointer accent-accent"
        />
        <p className="text-xs text-gray-400 font-mono">
          → Recommended: 12-16 characters for strong security
        </p>
      </div>

      {/* Character Type Options */}
      <div className="space-y-3">
        <Label className="text-sm text-gray-300 font-mono tracking-widest">CHARACTER TYPES</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 hover:bg-accent/5 rounded-sm transition-colors">
            <Checkbox
              id="uppercase"
              checked={useUppercase}
              onCheckedChange={(checked) => setUseUppercase(!!checked)}
              className="border-accent"
            />
            <Label htmlFor="uppercase" className="font-normal cursor-pointer text-sm text-gray-300">
              Uppercase (A–Z)
            </Label>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-accent/5 rounded-sm transition-colors">
            <Checkbox
              id="lowercase"
              checked={useLowercase}
              onCheckedChange={(checked) => setUseLowercase(!!checked)}
              className="border-accent"
            />
            <Label htmlFor="lowercase" className="font-normal cursor-pointer text-sm text-gray-300">
              Lowercase (a–z)
            </Label>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-accent/5 rounded-sm transition-colors">
            <Checkbox
              id="numbers"
              checked={useNumbers}
              onCheckedChange={(checked) => setUseNumbers(!!checked)}
              className="border-accent"
            />
            <Label htmlFor="numbers" className="font-normal cursor-pointer text-sm text-gray-300">
              Numbers (0–9)
            </Label>
          </div>
          <div className="flex items-center gap-3 p-2 hover:bg-accent/5 rounded-sm transition-colors">
            <Checkbox
              id="special"
              checked={useSpecialChars}
              onCheckedChange={(checked) => setUseSpecialChars(!!checked)}
              className="border-accent"
            />
            <Label htmlFor="special" className="font-normal cursor-pointer text-sm text-gray-300">
              Special Chars (!, @, #, etc.)
            </Label>
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="space-y-3">
        <Label className="text-sm text-gray-300 font-mono tracking-widest">ADVANCED</Label>
        <div className="flex items-center gap-3 p-2 hover:bg-accent/5 rounded-sm transition-colors">
          <Checkbox
            id="exclude-similar"
            checked={excludeSimilar}
            onCheckedChange={(checked) => setExcludeSimilar(!!checked)}
            className="border-accent"
          />
          <Label htmlFor="exclude-similar" className="font-normal cursor-pointer text-sm text-gray-300">
            Exclude Similar (O, 0, l, 1, I)
          </Label>
        </div>
      </div>

      {/* Number of Passwords */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="count" className="text-sm text-gray-300 font-mono">QUANTITY</Label>
          <span className="text-lg font-bold text-accent">{count}</span>
        </div>
        <input
          id="count"
          type="range"
          min="1"
          max="10"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-full h-2 bg-muted border border-accent/20 rounded-sm cursor-pointer accent-accent"
        />
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={!atLeastOneSelected || isLoading}
        size="lg"
        className="w-full bg-accent text-background hover:bg-accent/90 font-bold text-base neon-glow disabled:opacity-50"
      >
        {isLoading ? 'EXECUTING...' : 'GENERATE NOW'}
      </Button>

      {!atLeastOneSelected && (
        <p className="text-xs text-red-500 font-mono text-center">
          ⚠ SELECT AT LEAST ONE CHARACTER TYPE
        </p>
      )}
    </div>
  );
}
