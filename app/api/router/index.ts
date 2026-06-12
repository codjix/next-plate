import { coreRouter } from "./core";

// Shared router type
export type Router = typeof router;

// Base router structure
export const router = {
  ...coreRouter,
};
