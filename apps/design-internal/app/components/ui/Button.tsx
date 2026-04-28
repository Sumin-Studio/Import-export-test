import type { ComponentProps } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  disabled?: boolean;
} & (
  | (ComponentProps<"button"> & { as?: "button" })
  | (ComponentProps<"a"> & { as: "a" })
);

export function Button({
  variant = "primary",
  disabled,
  className,
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    disabled ? styles.disabled : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (props.as === "a") {
    const { as: _, ...anchorProps } = props as ComponentProps<"a"> & {
      as: "a";
    };
    return (
      <a
        className={classes}
        aria-disabled={disabled || undefined}
        {...anchorProps}
      />
    );
  }

  const { as: _, ...buttonProps } = props as ComponentProps<"button"> & {
    as?: "button";
  };
  return <button className={classes} disabled={disabled} {...buttonProps} />;
}
