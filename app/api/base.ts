import { os } from "@orpc/server";
import { authMiddleware } from "./middlewares/auth.middleware";
import { dbMiddleware } from "./middlewares/db.middleware";
import { headersMiddleware } from "./middlewares/headers.middleware";

// Base public procedure with headers, database and schema
export const publicProcedure = os
  .errors({ INTERNAL_SERVER_ERROR: { message: "Internal server error" } })
  .use(headersMiddleware)
  .use(dbMiddleware);

// Extend public procedure with auth layer and session
export const safeProcedure = publicProcedure.use(authMiddleware);
