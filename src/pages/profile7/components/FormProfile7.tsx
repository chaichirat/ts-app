import { useCallback, useState } from "react";
import { Form } from "react-final-form";
import type { IProfileType } from "../../profile/components/FormProfile";
import { FormProfileDetail7 } from "./FormProfileDetail7";

export const FormProfile7 = () => {
  const [showProfile, setShowProfile] = useState(false);

  const onSubmit = useCallback(() => setShowProfile(true), []);
  const resetShowProfile = useCallback(() => setShowProfile(false), []);

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
    // if (!values.gender) {
    //   errors.gender = "Gender is required";
    // }
    // if (!values.job) {
    //   errors.job = "Job is required";
    // }
    if (!values.provice) {
      errors.provice = "Provice is required";
    }
    if (!values.district) {
      errors.district = "District is required";
    }

    return errors;
  }, []);

  return (
    <>
      <h1>Page Profile 7</h1>
      <Form onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormProfileDetail7
              showProfile={showProfile}
              resetProfile={resetShowProfile}
            />
          </form>
        )}
      </Form>
    </>
  );
};
