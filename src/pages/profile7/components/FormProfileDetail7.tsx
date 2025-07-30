import { Box } from "@mui/system";
import {
  ImageField,
  SelectField,
  TextField,
} from "../../../components/field-form";
import { Avatar, Button } from "@mui/material";
import { useCustomForm } from "../../../components/field-form/use-form";
import { useCallback, useMemo } from "react";
import type { IProfileType } from "../../profile/components/FormProfile";
import { top100Films } from "../../../components/field-form/selector/top100Films";

type IFormProFileProps7 = {
  showProfile: boolean;
  resetProfile: () => void;
};

export const FormProfileDetail7 = (props: IFormProFileProps7) => {
  const { showProfile, resetProfile } = props;
  const { restart, values } = useCustomForm<IProfileType>();

  const onReset = useCallback(() => {
    restart();
    resetProfile();
  }, []);

  const top100FilmsOption = useMemo(() => {
    return top100Films.map((film) => ({
      label: film.label,
      value: film.year,
    }));
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        width={400}
        bgcolor="white"
        borderRadius="0.5rem"
        p="2rem"
        gap="1rem"
        marginBottom="2rem"
      >
        <ImageField name="image" label="Image Profile" />
        <TextField name="firstName" label="First Name" />
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
        <SelectField name="movie" label="Movie" options={top100FilmsOption} />
        <SelectField
          name="provice"
          label="Provice"
          options={top100FilmsOption}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="1rem"
        >
          <Button
            onClick={onReset}
            variant="contained"
            color="error"
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
          width={400}
          bgcolor="white"
          borderRadius="0.5rem"
          p="2rem"
          color="black"
          textAlign="start"
        >
          <Box display="flex" justifyContent="center" width="100%">
            <Avatar src={values.image} sx={{ width: 100, height: 100 }} />
          </Box>
          <h2>First Name: {values.firstName}</h2>
          <h2>Last Name: {values.lastName}</h2>
          <h2>Age: {values.age}</h2>
          <h2>Movie: {values.movie}</h2>
        </Box>
      ) : undefined}
    </>
  );
};
