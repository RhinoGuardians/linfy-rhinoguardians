import type { ReactNode } from "react";
import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/components/ui/button";
import { appRoutes } from "@/config/routes";
import { cn } from "@/lib/utils";

const marketingNavLinks = [
  { label: "Product", href: "#product" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
] as const;

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="marketing-theme min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border-subtle/70 bg-canvas/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden text-xs uppercase tracking-[0.24em] text-text-muted lg:inline-flex">
              by Linfy Tech Solutions
            </span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            {marketingNavLinks.map((item) => (
              <a
                className="text-sm text-text-muted transition-colors hover:text-text-primary"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              className={buttonVariants({ size: "sm", variant: "ghost" })}
              href={appRoutes.signIn}
            >
              Sign in
            </Link>
            <Link
              className={cn(
                buttonVariants({ size: "sm" }),
                "shadow-[0_18px_40px_-24px_rgba(65,166,112,0.75)]",
              )}
              href={appRoutes.signUp}
            >
              Request demo
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border-subtle/70" id="contact">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[minmax(0,1.3fr)_repeat(2,minmax(0,0.7fr))]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-md text-sm leading-7 text-text-muted">
              RhinoGuardians by Linfy Tech Solutions equips conservation teams
              with clearer operational visibility, faster threat response, and
              a trusted intelligence layer for reserve protection.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-text-primary">Platform</p>
            <div className="flex flex-col gap-3 text-sm text-text-muted">
              <a href="#product">Product</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#impact">Impact</a>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-text-primary">Company</p>
            <div className="flex flex-col gap-3 text-sm text-text-muted">
              <Link href={appRoutes.signIn}>Sign in</Link>
              <Link href={appRoutes.signUp}>Request demo</Link>
              <a href="mailto:contact@linfy.tech">contact@linfy.tech</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border-subtle/70">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
            <p>RhinoGuardians by Linfy Tech Solutions</p>
            <p>Conservation intelligence for reserves, NGOs, and field operations.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
