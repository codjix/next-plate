import type { Metadata } from "next";
import { cookies } from "next/headers";
import { CookieManager } from "@/components/cookie-manager";
import { Providers } from "@/components/providers";
import { CONFIG } from "@/features/const";

export const metadata: Metadata = {
  title: CONFIG.title,
  description: CONFIG.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookie = await cookies();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <CookieManager value={cookie.toString()}>
          <Providers>{children}</Providers>
        </CookieManager>
      </body>
    </html>
  );
}
