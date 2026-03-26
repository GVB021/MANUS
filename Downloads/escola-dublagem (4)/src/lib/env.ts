// Environment validation
export const isProduction = import.meta.env.MODE === 'production';

export const requiredEnvVars = ['VITE_STRIPE_PUBLIC_KEY'] as const;
export type RequiredEnv = typeof requiredEnvVars[number];

export function validateEnv() {
  const missing: string[] = [];
  requiredEnvVars.forEach(key => {
    if (!import.meta.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    console.error(`❌ Missing env vars: ${missing.join(', ')}`);
    if (isProduction) {
      throw new Error(`Missing required env vars: ${missing.join(', ')}`);
    }
  }
}

// Run on app start
validateEnv();

export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

