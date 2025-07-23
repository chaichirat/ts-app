import { Autocomplete, TextField } from "@mui/material";
import top100Films from "./top100Films";
import { useCallback, type SyntheticEvent } from "react";

type ISelectorProps = {
  value: string;
  error: boolean;
  onChange: (value: string) => void;
};

export const Selector = (props: ISelectorProps) => {
  const { value, error, onChange } = props;

  const handleSelectChange = useCallback(
    (
      event: SyntheticEvent<Element, Event>,
      value: {
        label: string;
        year: number;
      } | null
    ) => {
      console.log(value?.label);
      onChange(value?.label as string);
    },
    [onChange]
  );

  return (
    <Autocomplete
      disablePortal
      value={top100Films.find((film) => film.label === value)}
      options={top100Films}
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} error={error} label="Movie" />
      )}
      onChange={handleSelectChange}
    />
  );
};
