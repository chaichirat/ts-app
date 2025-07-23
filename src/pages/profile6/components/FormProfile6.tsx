import { useCallback, useState } from "react";
import { Form } from "react-final-form";
import type { IProfileType } from "../../profile/components/FormProfile";
import { FormProfileDetail6 } from "./FormProfileDetail6";

export const FormProfile6 = () => {
  const [showProfile, setShowProfile] = useState(false);

  const onSubmit = useCallback(() => setShowProfile(true), []);

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
    if (!values.select) {
      errors.select = "Select is required";
    }

    return errors;
  }, []);

  const resetShowProfile = useCallback(() => setShowProfile(false), []);

  return (
    <>
      <h1>Page Profile 6</h1>
      <Form<IProfileType> onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormProfileDetail6
              showProfile={showProfile}
              resetShowProfile={resetShowProfile}
            />
          </form>
        )}
      </Form>
    </>
  );
};
