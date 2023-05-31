import { MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";
import classes from "./button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary" | "squid";
  onClick: MouseEventHandler<HTMLButtonElement>;
  label?: string | ReactNode;
};

export default function Button({
  variant = "primary",
  onClick,
  label,
}: ButtonProps) {
  switch (variant) {
    case "squid":
      return (
        <button
          type="button"
          onClick={onClick}
          className={clsx(
            classes.button,
            variant && classes[`button--${variant}`]
          )}
        >
          {label || "Pay with Squid"}
        </button>
      );
    default:
      return (
        <button
          type="button"
          onClick={onClick}
          className={clsx(
            classes.button,
            variant && classes[`button--${variant}`]
          )}
        >
          {label}
        </button>
      );
  }
}
