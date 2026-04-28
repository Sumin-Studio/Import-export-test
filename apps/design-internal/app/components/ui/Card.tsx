import type { ComponentProps } from "react";
import styles from "./Card.module.css";

type CardProps = ComponentProps<"div">;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={[styles.card, className ?? ""].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
