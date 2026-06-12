import { os } from "@orpc/server";
import { headers } from "next/headers";

export const headersMiddleware = os.middleware(async ({ context, next }) => {
  return next({ context: { ...context, headers: await headers() } });
});
