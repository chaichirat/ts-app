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
import { useCallback, useMemo, useState } from "react";
import type { IProfileType } from "../../profile/components/FormProfile";
import { top100Films } from "../../../components/field-form/selector/top100Films";
import { genderOption } from "../../../components/field-form/selector/gender";
import { jobOption } from "../../../components/field-form/selector/job";
import {
  bangkokOptions,
  chiangmaiOptions,
  chonburiOptions,
  provinces,
} from "../../../components/field-form/selector/address";
import type { IOptionProp } from "../../../components/field-form/selector/SelectField";

type IFormProFileProps2 = {
  showProfile: boolean;
  resetProfile: () => void;
};

export const FormProfileDetail2 = (props: IFormProFileProps2) => {
  const { showProfile, resetProfile } = props;
  const { restart, values } = useCustomForm<IProfileType>();
  const [districtOptions, setDistrictOptions] = useState<IOptionProp[]>();

  const onChangeProvices = useCallback((value: string) => {
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
    resetProfile();
    setDistrictOptions([]);
  }, []);

  const top100FilmsOption = useMemo(() => {
    return top100Films.map((film) => ({ value: film.year, label: film.label }));
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

  console.log("Job:", values.job);

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
        color="black"
      >
        <ImageField name="image" label="Image profile" />
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
        <RadioField name="gender" label="Gender" options={genderOption} />
        <SelectField name="movie" label="Movie" options={top100FilmsOption} />
        <SelectField
          name="provice"
          label="Provinces"
          options={provinces}
          onChange={onChangeProvices}
        />
        <SelectField
          name="district"
          label="Districts"
          options={districtOptions}
        />
        <CheckboxField name="job" label="Job" options={jobOptions} />
        <Box display="flex" flexDirection="row" gap="1rem" width="100%">
          <Button
            color="error"
            variant="contained"
            sx={{ width: "100%" }}
            onClick={onReset}
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
