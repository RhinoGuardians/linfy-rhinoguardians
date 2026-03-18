"use client";

import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Keep the provider tree centralized so Clerk, toasts, and other client-side
  // concerns can be added without bloating the root server layout.
  return <>{children}</>;
}

