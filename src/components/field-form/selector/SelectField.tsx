import { Autocomplete, TextField, type TextFieldProps } from "@mui/material";
import { useCallback, type SyntheticEvent } from "react";

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

  const selectedOption =
    options.find((option) => option.value === value) || null;

  const handleSelectChange = useCallback(
    (_: SyntheticEvent<Element, Event>, newValue: IOptionProp | null) => {
      onChange?.(newValue?.value as string);
    },
    [onChange]
  );

  // const [value, setValue] = useState<any>(defaultValue);

  // useEffect(() => {
  //   if (defaultValue) {
  //     setValue(null);
  //   } else {
  //     const found = options?.find((option) => {
  //       return defaultValue === option.value;
  //     });

  //     setValue(found);
  //   }
  // }, [defaultValue, options, value]);

  // const handleSelectChange = useCallback(
  //   (_: SyntheticEvent<Element, Event>, newValue: IOptionProp | null) => {
  //     onChange?.(newValue?.value as string);
  //   },
  //   [onChange]
  // );

  return (
    <Autocomplete
      disablePortal
      value={selectedOption}
      options={options}
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} {...restProps} label={label} />
      )}
      onChange={handleSelectChange}
    />
  );
};
