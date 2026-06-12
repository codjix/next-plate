import { inferAdditionalFields, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { AuthOptions } from "./server";

export const authClient = createAuthClient({
  plugins: [usernameClient(), inferAdditionalFields<AuthOptions>()],
  $InferAuth: {} as AuthOptions,
});
