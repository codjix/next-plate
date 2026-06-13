import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL ?? "./data/db.sqlite";

export default defineConfig({
  out: "./database/migrations",
  schema: "./database/schema/index.ts",
  dbCredentials: { url },
  dialect: "sqlite",
});
