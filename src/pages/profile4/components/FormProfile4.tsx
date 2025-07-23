import { Form } from "react-final-form";
import type { IProfileType } from "../../profile/components/FormProfile";
import { useCallback, useState } from "react";
import { FormProfileDetail4 } from "./FormProfileDetail4";

export const FormProfile4 = () => {
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
    if (!values.select) {
      errors.select = "Select is required";
    }

    return errors;
  }, []);
  return (
    <>
      <h1>Page Profile 4</h1>
      <Form<IProfileType> onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormProfileDetail4
              showProfile={showProfile}
              resetShowProfile={resetShowProfile}
            />
          </form>
        )}
      </Form>
    </>
  );
};
