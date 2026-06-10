import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./CtaLink.module.css";

type Variant = "primary" | "secondary";

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Use a plain anchor (e.g. mailto / external) instead of next/link. */
  external?: boolean;
  className?: string;
}

/**
 * Shared call-to-action link.
 * Primary = ink background / paper text. Secondary = ink outline.
 * Ruby is never used here — it is reserved for scarcity/status labels.
 */
export default function CtaLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: CtaLinkProps) {
  const classes = [styles.cta, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
