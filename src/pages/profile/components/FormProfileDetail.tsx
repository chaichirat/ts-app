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
import { useTranslation } from "react-i18next";

export type IFormProFileProps = {
  showProfile: boolean;
  resetShowProfile: () => void;
};

export const FormProfileDetail = (props: IFormProFileProps) => {
  const { showProfile, resetShowProfile } = props;
  const { change, restart, values } = useCustomForm<IProfileType>();
  const [districtOptions, setDistrictOptions] = useState<IOptionProp[]>([]);
  const { t } = useTranslation();

  const onChangeFirstName = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const textValue = event.target.value;

      if (textValue.includes("Mr.")) {
        change("gender", "m");
      } else if (textValue.includes("Ms.")) {
        change("gender", "f");
      }

      if (textValue.includes("sunny")) {
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

  const getLabel = useCallback((options: IOptionProp[], value: string) => {
    return options.find((option) => option.value === value)?.label;
  }, []);

  const top100FilmsOption = useMemo(() => {
    return top100Films.map((film) => ({
      label: film?.label,
      value: film?.year,
    }));
  }, []);

  const genderLabel = useMemo(() => {
    return getLabel(genderOption, values?.gender ?? "");
  }, [values?.gender]);

  const movieLabel = useMemo(() => {
    return getLabel(top100FilmsOption, values?.movie ?? "");
  }, [values?.movie]);

  const proviceLabel = useMemo(() => {
    return getLabel(provinces, values?.province ?? "");
  }, [values?.province]);

  const districtLabel = useMemo(() => {
    return getLabel(districtOptions, values?.district ?? "");
  }, [values?.district]);

  const jobLabel = useMemo(() => {
    const labels = jobOption
      .filter((job) => values?.job?.includes(job.value))
      .map((job) => {
        if (job.nameText) {
          return t(values?.[`${job.nameText as keyof IProfileType}`] ?? "");
        } else {
          return t(job.label);
        }
      });

    return labels.join(", ");
  }, [values?.job, values?.textOther, values?.textSoftware, t]);

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
          label={t("First Name")}
          onChange={onChangeFirstName}
        />
        <TextField name="lastName" label={t("Last Name")} />
        <TextField
          type="number"
          sx={{
            "input:: -webkit-inner-spin-button": {
              WebkitAppearance: "none",
            },
          }}
          name="age"
          label={t("Age")}
        />
        <RadioField name="gender" label={"Gender"} options={genderOption} />
        <SelectField
          name="province"
          label={"Provinces"}
          options={provinces}
          onChange={onChangeProvince}
        />
        <SelectField
          name="district"
          label={"Districts"}
          options={districtOptions}
        />
        <SelectField name="movie" label={"Movie"} options={top100FilmsOption} />
        <CheckboxField name="job" label={"Job"} options={jobOption} />
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
            <Avatar src={values?.image} sx={{ width: 100, height: 100 }} />
          </Box>
          <h2>
            {t("First Name")}: {values?.firstName}
          </h2>
          <h2>
            {t("Last Name")}: {values?.lastName}
          </h2>
          <h2>
            {t("Age")}: {values?.age}
          </h2>
          <h2>
            {t("Gender")}: {t(genderLabel ?? "")}
          </h2>
          <h2>
            {t("Address")}: {t(districtLabel ?? "")}, {t(proviceLabel ?? "")}
          </h2>
          <h2>
            {t("Movie")}: {movieLabel}
          </h2>
          <h2>
            {t("Job")}: {jobLabel}
          </h2>
        </Box>
      ) : undefined}
    </>
  );
};
