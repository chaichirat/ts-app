import { Autocomplete, TextField, type TextFieldProps } from "@mui/material";
import { useCallback, type SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

export type IOptionProp = {
  label: string;
  value: string | number;
};

export type ISelectorProps = {
  onChange?: (value: string) => void;
  label: string;
  value?: string;
  options?: IOptionProp[];
} & Omit<TextFieldProps, "onChange">;

export const Selector = (props: ISelectorProps) => {
  const { onChange, label, value, options = [], ...restProps } = props;
  const { t } = useTranslation();

  const selectedOption =
    options.find((option) => option.value === value) || null;

  const handleSelectChange = useCallback(
    (_: SyntheticEvent<Element, Event>, newValue: IOptionProp | null) => {
      onChange?.(newValue?.value as string);
    },
    [onChange]
  );

  return (
    <Autocomplete
      disablePortal
      value={selectedOption}
      options={options}
      getOptionLabel={(option) => t(option.label)}
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} {...restProps} label={t(label)} />
      )}
      onChange={handleSelectChange}
    />
  );
};
