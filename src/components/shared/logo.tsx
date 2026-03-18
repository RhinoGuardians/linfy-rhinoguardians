import Link from "next/link";

export function Logo() {
  return (
    <Link className="inline-flex items-center gap-3 font-semibold" href="/">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary text-sm text-white">
        RG
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm uppercase tracking-[0.24em] text-text-muted">
          Linfy
        </span>
        <span className="text-base text-text-primary">RhinoGuardians</span>
      </span>
    </Link>
  );
}

