import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import type { IOptionProp } from "./selector/SelectField";
import { useCallback } from "react";

type ICheckBoxProp = {
  label: string;
  value: string[];
  onChange: (value: string[] | undefined) => void;
  options: IOptionProp[];
};

export const CheckboxButtons = (props: ICheckBoxProp) => {
  const { label, value = [], onChange, options = [], ...restProps } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: selectedValue, checked } = event.target;
      let updatedValues: string[];

      if (checked) {
        updatedValues = [...value, selectedValue];
      } else {
        updatedValues = value.filter((item) => item !== selectedValue);
      }

      onChange(updatedValues.length > 0 ? updatedValues : undefined);
    },
    [onChange]
  );

  const checkBox = options.map((option) => {
    const stringValue = option.value.toString();
    return (
      <FormControlLabel
        key={stringValue}
        control={
          <Checkbox
            checked={value.includes(stringValue)}
            onChange={handleChange}
            value={stringValue}
          />
        }
        label={option.label}
      />
    );
  });

  return (
    <FormControl {...restProps}>
      <FormLabel>{label}</FormLabel>
      {checkBox}
    </FormControl>
  );
};
