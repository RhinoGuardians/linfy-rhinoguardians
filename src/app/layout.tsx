import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
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
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "hsl(145 41% 46%)",
              colorBackground: "hsl(154 24% 12%)",
              colorInputBackground: "hsl(154 20% 14%)",
              colorInputText: "hsl(48 30% 96%)",
              colorText: "hsl(48 30% 96%)",
              colorTextSecondary: "hsl(145 13% 72%)",
              colorNeutral: "hsl(154 17% 24%)",
              colorDanger: "hsl(11 82% 60%)",
              borderRadius: "1rem",
            },
            elements: {
              card: "shadow-none bg-transparent",
              footerActionLink: "text-[hsl(150_32%_61%)] hover:text-white",
              formButtonPrimary:
                "bg-[hsl(145_41%_46%)] text-white hover:bg-[hsl(145_41%_42%)] shadow-none",
              formFieldInput:
                "border border-[hsl(154_17%_24%)] bg-[hsl(154_20%_14%)] text-[hsl(48_30%_96%)]",
              formFieldLabel: "text-[hsl(145_13%_72%)]",
              headerSubtitle: "text-[hsl(145_13%_72%)]",
              headerTitle: "text-[hsl(48_30%_96%)]",
              socialButtonsBlockButton:
                "border border-[hsl(154_17%_24%)] bg-[hsl(154_20%_14%)] text-[hsl(48_30%_96%)] hover:bg-[hsl(154_20%_18%)]",
              socialButtonsBlockButtonText: "text-[hsl(48_30%_96%)]",
            },
          }}
        >
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
