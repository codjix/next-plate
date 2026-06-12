import type { Metadata } from "next";
import { CONFIG } from "@/features/const";

export const metadata: Metadata = {
  title: `Home | ${CONFIG.title}`,
};

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the Home page</p>
    </div>
  );
}
