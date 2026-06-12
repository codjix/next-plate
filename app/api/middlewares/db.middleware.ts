import { os } from "@orpc/server";
import * as dz from "drizzle-orm";
import { db, schema } from "@/database";

export const dbMiddleware = os.middleware(async ({ context, next }) => {
  // Mount database and schema
  return next({ context: { ...context, db, schema, dz } });
});
