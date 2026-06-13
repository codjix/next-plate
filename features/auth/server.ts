import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { openAPI, username } from "better-auth/plugins";
import { db, schema } from "@/database";

// Shared Auth types
export type AuthOptions = typeof auth.options;

// Better Auth instance
export const auth = betterAuth({
  // Use Drizzle ORM
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  // Plugins, features and configurations
  plugins: [nextCookies(), openAPI({ path: "/docs" }), username()],
  emailAndPassword: {
    enabled: true,
    // TODO: handle emails in production
    requireEmailVerification: false,
    password: {
      hash: (value) => Bun.password.hash(value, "bcrypt"),
      verify: (value) => Bun.password.verify(value.password, value.hash, "bcrypt"),
    },
  },
});
