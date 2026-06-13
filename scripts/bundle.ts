import { $ } from "bun";

// Build the project
await $`BUNDLE=true next build`;

// Bundle standalone server
await $`rm -rf dist`.nothrow();
await $`cp -r .next/standalone dist`;
await $`cp -r .next/static dist/.next`;
await $`cp -r public dist`.nothrow();

// Remove unnecessary modules (CAUTION: experimental)
await $`rm -rf dist/node_modules/typescript`;
await $`rm -rf dist/node_modules/@img`;
