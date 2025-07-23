import { Box } from "@mui/system";
import {
  ImageField,
  SelectField,
  TextField,
} from "../../../components/field-form";
import { Avatar, Button } from "@mui/material";
import { useCustomForm } from "../../../components/field-form/use-form";
import type { IProfileType } from "../../profile/components/FormProfile";
import { useCallback } from "react";

type IFormProFileProps5 = {
  showProfile: boolean;
  resetShowProfile: () => void;
};

export const FormProfileDetail5 = (props: IFormProFileProps5) => {
  const { restart, values } = useCustomForm<IProfileType>();
  const { showProfile, resetShowProfile } = props;

  const onReset = useCallback(() => {
    restart();
    resetShowProfile();
  }, [restart]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="white"
        width="400px"
        gap="1rem"
        p="2rem"
        borderRadius="0.5rem"
        marginBottom="1rem"
      >
        <ImageField name="image" />
        <TextField name="firstName" label="First Name" />
        <TextField name="lastName" label="Last Name" />
        <TextField
          type="number"
          name="age"
          label="Age"
          sx={{
            "input:: -webkit-inner-spin-button": {
              WebkitAppearance: "none",
            },
          }}
        />
        <SelectField name="select" label="Movie" />
        <Box display="flex" flexDirection="row" gap="1rem" width="100%">
          <Button
            color="error"
            variant="contained"
            onClick={onReset}
            sx={{ width: "100%" }}
          >
            clear
          </Button>
          <Button type="submit" variant="contained" sx={{ width: "100%" }}>
            submit
          </Button>
        </Box>
      </Box>

      {showProfile ? (
        <Box
          display="flex"
          flexDirection="column"
          bgcolor="white"
          width="400px"
          p="2rem"
          borderRadius="0.5rem"
          textAlign="start"
          color="black"
        >
          <Box display="flex" justifyContent="center">
            <Avatar src={values.image} sx={{ width: 100, height: 100 }} />
          </Box>
          <h2>First Name: {values.firstName}</h2>
          <h2>Last Name: {values.lastName}</h2>
          <h2>Age: {values.age}</h2>
          <h2>Movie: {values.select}</h2>
        </Box>
      ) : undefined}
    </>
  );
};
