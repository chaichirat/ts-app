import { Autocomplete, TextField, type TextFieldProps } from "@mui/material";
import { useCallback, type SyntheticEvent, useEffect, useState } from "react";

type IOptionProp = {
  label: string;
  value: string | number;
};

export type ISelectorProps = {
  onChange?: (value: string) => void;
  label: string;
  defaultValue?: string;
  options?: IOptionProp[];
} & Omit<TextFieldProps, "onChange">;

export const Selector = (props: ISelectorProps) => {
  const { onChange, label, defaultValue, options = [], ...restProps } = props;

  const [value, setValue] = useState<any>(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setValue(null);
    } else {
      const found = options?.find((option) => {
        return defaultValue === option.value;
      });

      setValue(found);
    }
  }, [defaultValue, options, value]);

  const handleSelectChange = useCallback(
    (
      event: SyntheticEvent<Element, Event>,
      value: {
        label: string;
        year: number;
      } | null
    ) => {
      console.log(value?.label);
      onChange?.(value?.label as string);
    },
    [onChange]
  );

  return (
    <Autocomplete
      disablePortal
      value={value}
      options={options}
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} {...restProps} label={label} />
      )}
      onChange={handleSelectChange}
    />
  );
};
