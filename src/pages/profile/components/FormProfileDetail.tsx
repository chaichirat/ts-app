import { useCallback, type ChangeEvent } from "react";

import { TextField } from "../../../components/field-form";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useCustomForm } from "../../../components/field-form/use-form";
import type { IProfileType } from "./FormProfile";

type IFormProfileDetail = {
  onShowProfile: () => void;
};

export const FormProfileDetail = (props: IFormProfileDetail) => {
  const { onShowProfile } = props;
  const { change, restart } = useCustomForm<IProfileType>();

  const onChangeFirstName = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log("Change values:", e.target.value);

      if (e.target.value === "sunny") {
        change("lastName", "wiwat");
        change("age", 23);
      }
    },
    [change]
  );

  const onReset = useCallback(() => {
    restart();
    onShowProfile();
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        gap: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        width: 400,
      }}
    >
      <TextField
        name="firstName"
        label="First Name"
        onChange={onChangeFirstName}
      />
      <TextField name="lastName" label="Last Name" />
      <TextField type="number" name="age" label="Age" />
      <Box
        display="flex"
        flexDirection="row"
        gap="1rem"
        justifyContent="center"
      >
        <Button
          sx={{ width: "100%" }}
          color="error"
          variant="contained"
          onClick={onReset}
        >
          Clear
        </Button>
        <Button sx={{ width: "100%" }} type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};
