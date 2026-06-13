import type { InferRouterOutputs } from "@orpc/server";
import { type Router, router } from "./router";

// Infer the outputs of the router
export type RPCOutputs = InferRouterOutputs<Router>;

// RPC router instance
export const rpc = router;
