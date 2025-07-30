import { useCallback, useState } from "react";
import { Form } from "react-final-form";
import type { IProfileType } from "../../profile/components/FormProfile";
import { FormProfileDetail11 } from "./FormProfileDetail11";

export const FormProfile11 = () => {
  const [showProfile, setShowProfile] = useState(false);

  const onSubmit = useCallback(() => setShowProfile(true), []);
  const onResetShowProfile = useCallback(() => setShowProfile(false), []);

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
      <h1>Page Profile 11</h1>
      <Form onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormProfileDetail11
              showProfile={showProfile}
              resetShowProfile={onResetShowProfile}
            />
          </form>
        )}
      </Form>
    </>
  );
};
