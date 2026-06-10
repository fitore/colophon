import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/** Centred, max-width content well with consistent gutters. */
export default function Container({
  children,
  as: Tag = "div",
  className,
}: ContainerProps) {
  return (
    <Tag className={[styles.container, className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
