import type { Metadata } from "next";
import { CONFIG } from "@/features/const";

export const metadata: Metadata = {
  title: `Register | ${CONFIG.title}`,
};

export default function Register() {
  return (
    <div>
      <h1>Register Page</h1>
      <p>This is the register page</p>
    </div>
  );
}
