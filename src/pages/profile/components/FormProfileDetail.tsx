import { useCallback, type ChangeEvent } from "react";
import {
  ImageField,
  SelectField,
  TextField,
} from "../../../components/field-form";
import Button from "@mui/material/Button";
import { Avatar, Box } from "@mui/material";
import { useCustomForm } from "../../../components/field-form/use-form";
import type { IProfileType } from "./FormProfile";

export type IFormProFileProps = {
  showProfile: boolean;
  resetShowProfile: () => void;
};

export const FormProfileDetail = (props: IFormProFileProps) => {
  const { showProfile, resetShowProfile } = props;
  const { change, restart, values } = useCustomForm<IProfileType>();

  const onChangeFirstName = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log("Change values:", event.target.value);

      if (event.target.value === "sunny") {
        change("lastName", "wiwat");
        change("age", 23);
      }
    },
    [change]
  );

  const onReset = useCallback(() => {
    restart();
    resetShowProfile();
  }, [restart]);

  return (
    <>
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
        <ImageField name="image" label="Profile Image" />
        <TextField
          name="firstName"
          label="First Name"
          onChange={onChangeFirstName}
        />
        <TextField name="lastName" label="Last Name" />
        <TextField
          type="number"
          sx={{
            "input:: -webkit-inner-spin-button": {
              WebkitAppearance: "none",
            },
          }}
          name="age"
          label="Age"
        />
        <SelectField name="select" label="Movie" />
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

      {showProfile ? (
        <Box
          sx={{
            p: 4,
            m: "2rem",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            textAlign: "start",
            bgcolor: "background.paper",
            color: "black",
            width: 400,
          }}
        >
          <Box display="flex" justifyContent="center" width="100%">
            <Avatar src={values.image} sx={{ width: 100, height: 100 }} />
          </Box>
          <h2>First name: {values.firstName}</h2>
          <h2>Last name: {values.lastName}</h2>
          <h2>Age: {values.age}</h2>
          <h2>Movie: {values.select}</h2>
        </Box>
      ) : undefined}
    </>
  );
};
