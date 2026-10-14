import Link from "next/link";

import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-7", className)}>
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M10.5 21.5v-11l11 11v-11"
        fill="none"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      aria-label="NUVEXA, ir al inicio"
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold tracking-[0.14em]",
        tone === "dark" ? "text-ink-foreground" : "text-foreground",
        className,
      )}
    >
      <LogoMark />
      <span className="text-[15px]">NUVEXA</span>
    </Link>
  );
}
