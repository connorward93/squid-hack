import clsx from "clsx";
import classes from "./loading.module.css";

export default function Spinner({ size }: { size?: "small" }) {
  return (
    <div
      className={clsx(classes.spinner, size && classes[`spinner--${size}`])}
    />
  );
}
