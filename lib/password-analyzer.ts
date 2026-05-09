export interface PasswordStrengthResult {
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  score: number;
  suggestions: string[];
  analysis: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    specialChars: boolean;
    noRepetition: boolean;
    noSequence: boolean;
  };
}

export function analyzePasswordStrength(password: string): PasswordStrengthResult {
  const suggestions: string[] = [];
  let score = 0;

  const analysis = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    specialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    noRepetition: !/(.)\1{2,}/.test(password),
    noSequence: !hasConsecutiveSequence(password),
  };

  // Length check
  if (analysis.length) {
    score += 20;
    if (password.length >= 12) score += 5;
    if (password.length >= 16) score += 5;
  } else {
    suggestions.push('Use at least 8 characters (12+ is stronger)');
  }

  // Character diversity
  let charTypeCount = 0;
  if (analysis.uppercase) {
    charTypeCount++;
    score += 15;
  } else {
    suggestions.push('Add uppercase letters (A-Z)');
  }

  if (analysis.lowercase) {
    charTypeCount++;
    score += 15;
  } else {
    suggestions.push('Add lowercase letters (a-z)');
  }

  if (analysis.numbers) {
    charTypeCount++;
    score += 15;
  } else {
    suggestions.push('Add numbers (0-9)');
  }

  if (analysis.specialChars) {
    charTypeCount++;
    score += 20;
  } else {
    suggestions.push('Add special characters (!@#$%^&*)');
  }

  // Diversity bonus
  if (charTypeCount === 4) {
    score += 10;
  } else if (charTypeCount === 3) {
    score += 5;
  }

  // Repetition check
  if (!analysis.noRepetition) {
    score -= 10;
    suggestions.push('Avoid repeating characters (aaa, 111)');
  }

  // Sequence check
  if (!analysis.noSequence) {
    score -= 10;
    suggestions.push('Avoid sequential characters (abc, 123)');
  }

  // Normalize score
  score = Math.max(0, Math.min(100, score));

  let strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  if (score < 40) {
    strength = 'weak';
  } else if (score < 60) {
    strength = 'medium';
  } else if (score < 80) {
    strength = 'strong';
  } else {
    strength = 'very-strong';
  }

  return {
    strength,
    score,
    suggestions,
    analysis,
  };
}

function hasConsecutiveSequence(password: string): boolean {
  for (let i = 0; i < password.length - 2; i++) {
    const code1 = password.charCodeAt(i);
    const code2 = password.charCodeAt(i + 1);
    const code3 = password.charCodeAt(i + 2);

    // Check for sequential characters
    if (code2 === code1 + 1 && code3 === code2 + 1) {
      return true;
    }
  }
  return false;
}
