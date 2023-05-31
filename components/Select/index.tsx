import ReactSelect from "react-select";
import classes from "./select.module.css";

type SelectProps = {
  value?: any;
  options: { value: string | number; label: string }[];
  onChange: any;
};

export default function Select({
  value,
  options,
  onChange,
  ...props
}: SelectProps) {
  return (
    <ReactSelect
      value={value}
      unstyled
      onChange={onChange}
      classNames={{
        container: () => classes.container,
        control: () => classes.control,
        menu: () => classes.menu,
        option: () => classes.option,
      }}
      options={options}
      {...props}
    />
  );
}
