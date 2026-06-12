"use server";
import { publicProcedure } from "../../base";

export const health = publicProcedure
  // simple health status
  .route({ method: "GET", tags: ["Core"] })
  .handler(() => "ok")
  .actionable();
