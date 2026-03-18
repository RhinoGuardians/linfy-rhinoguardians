import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { appRoutes } from "@/config/routes";

export function SignUpView() {
  return (
    <Card>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-secondary">
            Enterprise Onboarding
          </p>
          <h1 className="text-2xl font-semibold text-text-primary">Sign up</h1>
          <p className="text-sm text-text-muted">
            Placeholder for a future Clerk-powered sign-up and organization
            provisioning flow.
          </p>
        </div>
        <div className="rounded-xl border border-dashed border-border-subtle p-4 text-sm text-text-muted">
          Capture reserve operator onboarding, NGO invitations, and investor
          workspace setup here.
        </div>
        <div className="flex items-center justify-between gap-3">
          <Link className="text-sm text-text-muted underline-offset-4 hover:underline" href={appRoutes.signIn}>
            Already have access?
          </Link>
          <Button type="button">Request access</Button>
        </div>
      </CardContent>
    </Card>
  );
}

