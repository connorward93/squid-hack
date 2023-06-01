import { MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";
import classes from "./button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary" | "squid";
  onClick: MouseEventHandler<HTMLButtonElement>;
  label?: string | ReactNode;
  disabled?: boolean;
};

export default function Button({
  variant = "primary",
  onClick,
  label,
  disabled,
}: ButtonProps) {
  switch (variant) {
    case "squid":
      return (
        <button
          type="button"
          onClick={!disabled ? onClick : undefined}
          className={clsx(
            classes.button,
            variant && classes[`button--${variant}`]
          )}
          disabled={disabled}
        >
          {label || "Pay with Squid"}
        </button>
      );
    default:
      return (
        <button
          type="button"
          onClick={!disabled ? onClick : undefined}
          className={clsx(
            classes.button,
            variant && classes[`button--${variant}`]
          )}
          disabled={disabled}
        >
          {label}
        </button>
      );
  }
}
