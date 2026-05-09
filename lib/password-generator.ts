export interface PasswordOptions {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSpecialChars: boolean;
  excludeSimilar: boolean;
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:",.<>?/~`';

const SIMILAR_CHARS = ['O', 'o', '0', 'l', '1', 'I', 'i'];

function removeSimilarChars(str: string): string {
  return str.split('').filter(char => !SIMILAR_CHARS.includes(char)).join('');
}

export function generatePassword(options: PasswordOptions): string {
  let availableChars = '';

  if (options.useUppercase) {
    availableChars += options.excludeSimilar 
      ? removeSimilarChars(UPPERCASE) 
      : UPPERCASE;
  }
  if (options.useLowercase) {
    availableChars += options.excludeSimilar 
      ? removeSimilarChars(LOWERCASE) 
      : LOWERCASE;
  }
  if (options.useNumbers) {
    availableChars += options.excludeSimilar 
      ? removeSimilarChars(NUMBERS) 
      : NUMBERS;
  }
  if (options.useSpecialChars) {
    availableChars += SPECIAL_CHARS;
  }

  if (availableChars.length === 0) {
    throw new Error('At least one character type must be selected');
  }

  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
  }

  return password;
}

export function generateMultiplePasswords(options: PasswordOptions, count: number): string[] {
  return Array.from({ length: count }, () => generatePassword(options));
}

export function calculateStrength(password: string): 'Weak' | 'Medium' | 'Strong' {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (password.length >= 16) strength++;

  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{}|;:",.<>?/~`]/.test(password)) strength++;

  if (strength <= 2) return 'Weak';
  if (strength <= 4) return 'Medium';
  return 'Strong';
}
