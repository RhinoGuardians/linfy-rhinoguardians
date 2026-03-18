import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { appRoutes } from "@/config/routes";

export function SignInView() {
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
            Secure Access
          </p>
          <h1 className="text-2xl font-semibold text-text-primary">Sign in</h1>
          <p className="text-sm text-text-muted">
            Clerk-ready entry point for NGO operators, analysts, and field team
            coordinators.
          </p>
        </div>
        <div className="rounded-xl border border-dashed border-border-subtle p-4 text-sm text-text-muted">
          Authentication UI will be mounted here once Clerk is wired into the
          app providers and route protection flow.
        </div>
        <div className="flex items-center justify-between gap-3">
          <Link className="text-sm text-text-muted underline-offset-4 hover:underline" href={appRoutes.signUp}>
            Create an account
          </Link>
          <Button type="button">Continue</Button>
        </div>
      </CardContent>
    </Card>
  );
}

