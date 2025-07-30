import { Box } from "@mui/system";
import {
  CheckboxField,
  ImageField,
  RadioField,
  SelectField,
  TextField,
} from "../../../components/field-form";
import { Avatar, Button } from "@mui/material";
import { useCustomForm } from "../../../components/field-form/use-form";
import type { IProfileType } from "../../profile/components/FormProfile";
import { useCallback, useMemo, useState } from "react";
import type { IOptionProp } from "../../../components/field-form/selector/SelectField";
import {
  bangkokOptions,
  chiangmaiOptions,
  chonburiOptions,
  provinces,
} from "../../../components/field-form/selector/address";
import { genderOption } from "../../../components/field-form/selector/gender";
import { top100Films } from "../../../components/field-form/selector/top100Films";
import { jobOption } from "../../../components/field-form/selector/job";

type IFormProFileProps4 = {
  showProfile: boolean;
  resetShowProfile: () => void;
};

export const FormProfileDetail4 = (props: IFormProFileProps4) => {
  const { showProfile, resetShowProfile } = props;
  const { restart, values } = useCustomForm<IProfileType>();
  const [districtOptions, setDistrictOptions] = useState<IOptionProp[]>();

  const onChangeProvince = useCallback((value: string) => {
    if (value === "bangkok") {
      setDistrictOptions(bangkokOptions);
    } else if (value === "chiang_mai") {
      setDistrictOptions(chiangmaiOptions);
    } else if (value === "chonburi") {
      setDistrictOptions(chonburiOptions);
    }
  }, []);

  const onReset = useCallback(() => {
    restart();
    resetShowProfile();
    setDistrictOptions([]);
  }, [restart]);

  const top100FilmsOption = useMemo(() => {
    return top100Films.map((film) => ({
      value: film.year,
      label: film.label,
    }));
  }, []);

  const jobOptions = useMemo(() => {
    return jobOption.map((job) => ({
      value: job,
      label: job,
    }));
  }, []);

  const jobLabel = useMemo(() => {
    return Array.isArray(values.job) ? values.job.join(", ") : values.job;
  }, [values.job]);

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
        color="black"
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
        <RadioField name="gender" label="Gender" options={genderOption} />
        <SelectField name="movie" label="Movie" options={top100FilmsOption} />
        <SelectField
          name="provice"
          label="Provice"
          options={provinces}
          onChange={onChangeProvince}
        />
        <SelectField
          name="district"
          label="District"
          options={districtOptions}
        />
        <CheckboxField name="job" label="Job" options={jobOptions} />
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
          <h2>Gender: {values.gender}</h2>
          <h2>Movie: {values.movie}</h2>
          <h2>
            Address: {values.district}, {values.provice}
          </h2>
          <h2>Job: {jobLabel}</h2>
        </Box>
      ) : undefined}
    </>
  );
};
