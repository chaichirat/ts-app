import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
} from "@mui/material";
import { useCallback, type ChangeEvent, useMemo } from "react";
import { TextField } from ".";
import { useCustomForm } from "./use-form";
import type { IProfileType } from "../../pages/profile/components/FormProfile";
import { useTranslation } from "react-i18next";

type IOPtionOtherType = {
  label: string;
  value: string;
  nameText?: string;
};

type ICheckBoxButtonsProp = {
  label: string;
  value?: string[];
  onChange: (value: string[] | undefined) => void;
  options: IOPtionOtherType[];
};

export const CheckBoxButtons = (props: ICheckBoxButtonsProp) => {
  const { label, value = [], onChange, options = [], ...restProps } = props;
  const { t } = useTranslation();
  const { change } = useCustomForm<IProfileType>();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedValue = event.target.value;
      const checked = event.target.checked;
      let updatedValues: string[];

      if (checked) {
        updatedValues = [...value, selectedValue];
      } else {
        if (selectedValue === "software_engineer") {
          change("textSoftware", undefined);
        }
        if (selectedValue === "other") {
          change("textOther", undefined);
        }
        updatedValues = value?.filter((item) => item !== selectedValue);
      }

      onChange(updatedValues.length > 0 ? updatedValues : undefined);
    },
    [onChange]
  );

  const checkBox = useMemo(() => {
    return options?.map((option: IOPtionOtherType) => {
      const stringValue = option.value?.toString();
      return (
        <>
          <Box display="flex" alignItems="start">
            <FormControlLabel
              key={stringValue}
              control={
                <Checkbox
                  checked={value.includes(stringValue)}
                  onChange={handleChange}
                  value={stringValue}
                />
              }
              label={t(option.label)}
            />
            {option.nameText ? (
              <TextField
                size="small"
                name={option.nameText}
                disabled={value?.includes(option.value) ? false : true}
              />
            ) : undefined}
          </Box>
        </>
      );
    });
  }, [value, t]);

  return (
    <FormControl {...restProps}>
      <FormLabel>{t(label)}</FormLabel>
      {checkBox}
    </FormControl>
  );
};
