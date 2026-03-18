import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoVariant = "full" | "mark" | "compact";

interface LogoProps {
  className?: string;
  href?: string;
  priority?: boolean;
  supportingText?: string;
  variant?: LogoVariant;
}

export function Logo({
  className,
  href = "/",
  priority = false,
  supportingText,
  variant = "full",
}: LogoProps) {
  if (variant === "full") {
    return (
      <Link
        aria-label="RhinoGuardians by Linfy Tech Solutions"
        className={cn("inline-flex items-center", className)}
        href={href}
      >
        <Image
          alt="RhinoGuardians by Linfy Tech Solutions"
          className="h-auto w-[min(17.5rem,52vw)]"
          height={240}
          priority={priority}
          src="/brand/rhinoguardians-logo.svg"
          width={920}
        />
      </Link>
    );
  }

  return (
    <Link
      aria-label="RhinoGuardians"
      className={cn("inline-flex items-center gap-3", className)}
      href={href}
    >
      <Image
        alt="RhinoGuardians mark"
        className={cn(
          "h-auto rounded-2xl",
          variant === "compact" ? "w-10" : "w-11",
        )}
        height={220}
        priority={priority}
        src="/brand/rhinoguardians-mark.svg"
        width={220}
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            "font-semibold text-text-primary",
            variant === "compact" ? "text-sm" : "text-base",
          )}
        >
          RhinoGuardians
        </span>
        {supportingText ? (
          <span className="text-xs uppercase tracking-[0.24em] text-text-muted">
            {supportingText}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
