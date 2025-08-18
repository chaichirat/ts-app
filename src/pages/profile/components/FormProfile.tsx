import { useCallback, useState } from "react";
import { Form } from "react-final-form";
import { FormProfileDetail } from "./FormProfileDetail";
import { useTranslation } from "react-i18next";

export type IProfileType = {
  firstName: string;
  lastName: string;
  age: string;
  image: string;
  movie: string;
  gender: string;
  job: string[];
  province: string;
  district: string;
  textSoftware: string;
  textOther: string;
};

export const FormProfile = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const { t } = useTranslation();

  const onSubmit = useCallback(
    (values: IProfileType) => {
      console.log("Form submitted with values:", values);
      setShowProfile(true);
      console.log("show:", showProfile);
    },
    [showProfile]
  );

  const resetShowProfile = useCallback(() => {
    setShowProfile(false);
  }, []);

  const onValidate = useCallback(
    (values: IProfileType) => {
      const errors: Partial<IProfileType> = {};
      if (!values.image) {
        errors.image = t("Image Error");
      }
      if (!values.firstName) {
        errors.firstName = t("First Name Error");
      }
      if (!values.lastName) {
        errors.lastName = t("Last Name Error");
      }
      if (!values.age) {
        errors.age = t("Age Error");
      }
      if (!values.movie) {
        errors.movie = t("Movie Error");
      }
      if (!values.gender) {
        errors.gender = t("Gender Error");
      }
      if (!values.province) {
        errors.province = t("Province Error");
      }
      if (!values.district) {
        errors.district = t("District Error");
      }
      if (!values.job) {
        errors.job = t("Job Error") as any;
      }
      if (values.job?.includes("other")) {
        if (!values.textOther) {
          errors.textOther = t("Other Text Error");
        }
      }
      if (values.job?.includes("software_engineer")) {
        if (!values.textSoftware) {
          errors.textSoftware = t("Software Text Error");
        }
      }

      console.log("Error:", errors);
      console.log("result", values);
      return errors;
    },
    [t]
  );

  return (
    <>
      <h1>{t("Page Profile")}</h1>
      <Form<IProfileType> onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <FormProfileDetail
              showProfile={showProfile}
              resetShowProfile={resetShowProfile}
            />
          </form>
        )}
      </Form>
    </>
  );
};
