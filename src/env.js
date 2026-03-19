const { z } = require('zod');

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NEXT_PUBLIC_SITE_URL: z.string().url("NEXT_PUBLIC_SITE_URL must be a valid URL"),
  NEXTAUTH_URL: z.string().url("NEXTAUTH_URL must be a valid URL").optional(),
  NEXTAUTH_SECRET: process.env.NODE_ENV === 'production' 
    ? z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters long in production")
    : z.string().optional(),
  // Note: Optional or empty fallback keys
  ANTHROPIC_API_KEY: z.string().optional(),
});

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
}

module.exports = { validateEnv };
