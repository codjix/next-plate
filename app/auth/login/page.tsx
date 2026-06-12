import type { Metadata } from "next";
import { CONFIG } from "@/features/const";

export const metadata: Metadata = {
  title: `Login | ${CONFIG.title}`,
};

export default function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <p>This is the login page</p>
    </div>
  );
}
