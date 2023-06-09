import { ChangeEventHandler, ReactNode } from "react";
import clsx from "clsx";
import classes from "./input-radio.module.css";

export default function InputRadio({
  items,
  isChecked,
  onChange,
}: {
  items: { value: string; label: string | ReactNode }[];
  isChecked: Function;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className={classes.container}>
      {items.map(({ value, label }) => (
        <label
          key={`radio-input--${value}`}
          className={clsx(
            classes.label,
            isChecked(value) && classes["label--selected"]
          )}
        >
          <input
            type="radio"
            name={value}
            id={value}
            value={value}
            checked={isChecked(value)}
            onChange={onChange}
          ></input>
          {label}
        </label>
      ))}
    </div>
  );
}
