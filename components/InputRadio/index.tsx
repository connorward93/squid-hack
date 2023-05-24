import React, { ChangeEventHandler } from "react";

export default function InputRadio({
  items,
  isChecked,
  onChange,
}: {
  items: { value: string; label: string }[];
  isChecked: Function;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      {items.map(({ value, label }) => (
        <label key={`radio-input--${value}`}>
          <input
            type="radio"
            name={label}
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
