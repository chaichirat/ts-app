import { useCallback, useMemo, type ChangeEvent, useState } from "react";
import {
  CheckboxField,
  ImageField,
  RadioField,
  SelectField,
  TextField,
} from "../../../components/field-form";
import Button from "@mui/material/Button";
import { Avatar, Box } from "@mui/material";
import { useCustomForm } from "../../../components/field-form/use-form";
import type { IProfileType } from "./FormProfile";
import { genderOption } from "../../../components/field-form/selector/gender";
import { top100Films } from "../../../components/field-form/selector/top100Films";
import { jobOption } from "../../../components/field-form/selector/job";
import {
  bangkokOptions,
  chiangmaiOptions,
  chonburiOptions,
  provinces,
} from "../../../components/field-form/selector/address";
import type { IOptionProp } from "../../../components/field-form/selector/SelectField";

export type IFormProFileProps = {
  showProfile: boolean;
  resetShowProfile: () => void;
};

export const FormProfileDetail = (props: IFormProFileProps) => {
  const { showProfile, resetShowProfile } = props;
  const { change, restart, values } = useCustomForm<IProfileType>();
  const [districtOptions, setDistrictOptions] = useState<IOptionProp[]>([]);

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

  const onChangeProvince = useCallback((provinceValue: string) => {
    if (provinceValue === "bangkok") {
      setDistrictOptions(bangkokOptions);
    } else if (provinceValue === "chiang_mai") {
      setDistrictOptions(chiangmaiOptions);
    } else if (provinceValue === "chonburi") {
      setDistrictOptions(chonburiOptions);
    }
  }, []);

  const onReset = useCallback(() => {
    restart();
    resetShowProfile();
    setDistrictOptions([]);
  }, [restart]);

  const getLabel = (options: IOptionProp[], value: string): string => {
    return options.find((option) => option.value === value)?.label ?? "";
  };

  const top100FilmsOption = useMemo(() => {
    return top100Films.map((film) => ({
      label: film?.label,
      value: film?.year,
    }));
  }, []);

  const jobOptions = useMemo(() => {
    return jobOption.map((job) => ({
      label: job,
      value: job,
    }));
  }, []);

  const genderLabel = useMemo(() => {
    return getLabel(genderOption, values.gender);
  }, [values.gender]);

  const movieLabel = useMemo(() => {
    return getLabel(top100FilmsOption, values.movie);
  }, [values.movie]);

  const proviceLabel = useMemo(() => {
    return getLabel(provinces, values.provice);
  }, [values.provice]);

  const districtLabel = useMemo(() => {
    return getLabel(districtOptions, values.district);
  }, [values.district]);

  const jobLabel = useMemo(() => {
    return Array.isArray(values.job) ? values.job.join(", ") : values.job;
  }, [values.job]);

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
          color: "black",
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
        <RadioField name="gender" label="Gender" options={genderOption} />
        <SelectField
          name="provice"
          label="Provinces"
          options={provinces}
          onChange={onChangeProvince}
        />
        <SelectField
          name="district"
          label="Districts"
          options={districtOptions}
        />
        <SelectField name="movie" label="Movie" options={top100FilmsOption} />
        <CheckboxField name="job" label="Job" options={jobOptions} />
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
          <h2>Gender: {genderLabel}</h2>
          <h2>
            Address: {districtLabel}, {proviceLabel}
          </h2>
          <h2>Movie: {movieLabel}</h2>

          <h2>Job: {jobLabel}</h2>
        </Box>
      ) : undefined}
    </>
  );
};
