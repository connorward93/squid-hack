import ReactSelect from "react-select";
import classes from "./select.module.css";

type SelectProps = {
  options: { value: string | number; label: string }[];
  onChange: any;
};

export default function Select({ options, onChange }: SelectProps) {
  return (
    <ReactSelect
      unstyled
      onChange={onChange}
      classNames={{
        control: () => classes.control,
        menu: () => classes.menu,
        option: () => classes.option,
      }}
      options={options}
    />
  );
}
