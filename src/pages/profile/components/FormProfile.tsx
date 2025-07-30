import { useCallback, useState } from "react";
import { Form } from "react-final-form";
import { FormProfileDetail } from "./FormProfileDetail";

export type IProfileType = {
  firstName: string;
  lastName: string;
  age: string;
  image: string;
  movie: string;
  gender: string;
  job: string;
  provice: string;
  district: string;
};

export const FormProfile = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);

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

  const onValidate = useCallback((values: IProfileType) => {
    const errors: Partial<IProfileType> = {};
    if (!values.image) {
      errors.image = "Image is required";
    }
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values.age) {
      errors.age = "Age is required";
    }
    if (!values.movie) {
      errors.movie = "Movie is required";
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (!values.job) {
      errors.job = "Job is required";
    }
    if (!values.provice) {
      errors.provice = "Provice is required";
    }
    if (!values.district) {
      errors.district = "District is required";
    }

    console.log("Error:", errors);
    console.log("result", values);
    return errors;
  }, []);

  return (
    <>
      <h1>Page Profile</h1>
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
