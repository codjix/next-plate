import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import { rpc } from "../index";

async function handler(req: Request) {
  const { response } = await new RPCHandler(rpc, {
    interceptors: [onError((error) => console.error(error))],
    plugins: [new CORSPlugin()],
  }).handle(req, { prefix: "/api" });

  if (response) return response;
  const body = JSON.stringify({ ok: false, message: "Not found" });
  return new Response(body, { status: 404 });
}

export const GET = handler;
export const PUT = handler;
export const POST = handler;
export const DELETE = handler;
export const PATCH = handler;
export const HEAD = handler;
