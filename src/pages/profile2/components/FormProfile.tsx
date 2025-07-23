import { Form } from "react-final-form";
import { useCallback, useState } from "react";
import type { IProfileType } from "../../profile/components/FormProfile";
import { FormProfileDetail } from "./FormProfileDetail";

export const FormProfile = () => {
  const [showProfile, setShowProfile] = useState(false);

  const onSubmit = useCallback((values: IProfileType) => {
    console.log("Submit values:", values);
    setShowProfile(true);
  }, []);

  const onResetProfile = useCallback(() => setShowProfile(false), []);

  const onValidate = useCallback((values: IProfileType) => {
    const errors: Partial<IProfileType> = {};
    if (!values.image) {
      errors.image = "Image is required";
    }
    if (!values.firstName) {
      errors.firstName = "First name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!values.age) {
      errors.age = "Age is required";
    }
    if (!values.select) {
      errors.select = "Age is required";
    }

    return errors;
  }, []);

  return (
    <>
      <h1>Page Profile 2</h1>
      <Form<IProfileType> onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormProfileDetail
              showProfile={showProfile}
              resetProfile={onResetProfile}
            />
          </form>
        )}
      </Form>
    </>
  );
};
