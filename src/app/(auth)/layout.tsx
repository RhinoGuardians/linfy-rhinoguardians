import type { ReactNode } from "react";

import { AuthShell } from "@/components/layout/auth-shell";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthShell
      description="Secure access to your conservation operations platform"
      title="RhinoGuardians"
    >
      {children}
    </AuthShell>
  );
}
