import { os } from "@orpc/server";
import { auth } from "@/features/auth";

export const authMiddleware = os
  .$context<{ headers: Headers }>()
  .errors({ UNAUTHORIZED: { message: "Authentication required" } })
  .middleware(async ({ context, errors, next }) => {
    // Check Better Auth session
    const session = await auth.api.getSession({ headers: context.headers });
    if (!session) throw errors.UNAUTHORIZED();

    // Mount session
    return next({ context: { ...context, session } });
  });
