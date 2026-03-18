import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { Providers } from "@/app/providers";
import "@/app/globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "RhinoGuardians",
  description:
    "Enterprise wildlife conservation and anti-poaching intelligence platform by Linfy Tech Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className={`${bodyFont.variable} ${displayFont.variable}`} lang="en">
      <body className="font-[var(--font-body)] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
