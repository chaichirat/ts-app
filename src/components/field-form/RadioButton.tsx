import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import type { IOptionProp } from "./selector/SelectField";
import { useCallback, type ChangeEvent, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";

type IRadioButtonProps = {
  label: string;
  value: string;
  options: IOptionProp[];
  onChange?: (value: string) => void;
};

export const RadioButton = (props: IRadioButtonProps) => {
  const { label, value, options = [], onChange, ...restProps } = props;
  const { t } = useTranslation();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectValue = event.target.value;

      onChange?.(selectValue);
    },
    [onChange]
  );

  const radio = useMemo(() => {
    return options.map((option) => (
      <FormControlLabel
        value={option.value}
        control={<Radio />}
        label={t(option.label)}
        labelPlacement="start"
      />
    ));
  }, [options, t]);

  useEffect(() => {
    console.log("radio:", value);
  }, [value]);

  return (
    <FormControl {...restProps}>
      <FormLabel>{t(label)}</FormLabel>
      <RadioGroup row value={value} onChange={handleChange}>
        {radio}
      </RadioGroup>
    </FormControl>
  );
};
