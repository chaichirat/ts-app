import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import type { IOptionProp } from "./selector/SelectField";
import { useCallback } from "react";

type IRadioFieldProps = {
  label: string;
  value: string;
  options: IOptionProp[];
  onChange?: (value: string) => void;
};

export const RadioButton = (props: IRadioFieldProps) => {
  const { label, value, options = [], onChange, ...restProps } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value);
    },
    [onChange]
  );

  const radio = options.map((option) => (
    <FormControlLabel
      value={option.value}
      control={<Radio />}
      label={option.label}
    />
  ));

  console.log("radio", value);

  return (
    <FormControl {...restProps}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        {radio}
      </RadioGroup>
    </FormControl>
  );
};
