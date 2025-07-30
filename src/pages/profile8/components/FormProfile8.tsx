import { useCallback, useState } from "react";
import { Form } from "react-final-form";
import { FormProfileDetail8 } from "./FormProfileDetail8";
import type { IProfileType } from "../../profile/components/FormProfile";

export const FormProfile8 = () => {
  const [showProfile, setShowProfile] = useState(false);

  const onSubmit = useCallback(() => setShowProfile(true), []);
  const onResetProfile = useCallback(() => setShowProfile(false), []);

  const onValidate = useCallback((values: IProfileType) => {
    const errors: Partial<IProfileType> = {};

    if (!values.image) {
      errors.image = "Image is required.";
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

    return errors;
  }, []);

  return (
    <>
      <h1>Page Profile 8</h1>
      <Form onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormProfileDetail8
              showProfile={showProfile}
              resetProfile={onResetProfile}
            />
          </form>
        )}
      </Form>
    </>
  );
};
