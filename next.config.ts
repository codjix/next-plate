import type { NextConfig } from "next";

const config = (opts: NextConfig) => opts;
export default config({
  output: process.env.BUNDLE ? "standalone" : undefined,
});
