import type { ReactNode } from "react";

import { Logo } from "@/components/shared/logo";
import { Card, CardContent } from "@/components/ui/card";

interface AuthShellProps {
  children: ReactNode;
  title: string;
  description: string;
}

export function AuthShell({ children, title, description }: AuthShellProps) {
  return (
    <div className="marketing-theme relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(65,166,112,0.16),transparent_35%)]" />
      <div className="relative w-full max-w-md space-y-8">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="space-y-2">
            <h1 className="font-[var(--font-display)] text-4xl text-text-primary">
              {title}
            </h1>
            <p className="text-sm leading-7 text-text-muted">{description}</p>
            <p className="text-xs uppercase tracking-[0.24em] text-text-muted/80">
              Powered by Linfy Tech Solutions
            </p>
          </div>
        </div>
        <Card className="border-border-subtle/80 bg-surface/90 shadow-[0_30px_70px_-30px_rgba(8,26,18,0.95)] backdrop-blur-sm">
          <CardContent className="p-6 sm:p-8">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
