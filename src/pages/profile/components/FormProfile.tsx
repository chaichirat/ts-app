import { useCallback, useState } from "react";
import { Form } from "react-final-form";

import { Box } from "@mui/material";
import { FormProfileDetail } from "./FormProfileDetail";

export type IProfileType = {
  firstName: string;
  lastName: string;
  age: string;
};

export const FormProfile = () => {
  const [profile, setProfile] = useState<IProfileType>();
  const [showProfile, setShowProfile] = useState(false);

  const onSubmit = useCallback((values: IProfileType) => {
    console.log("Form submitted with values:", values);
    setProfile(values);
    setShowProfile(true);
  }, []);

  const onResetShowProfile = () => setShowProfile(false);

  const onValidate = useCallback((values: IProfileType) => {
    const errors: Partial<IProfileType> = {};
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values.age) {
      errors.age = "Age is required";
    }
    console.log("Error:", errors);
    return errors;
  }, []);

  return (
    <>
      <Form<IProfileType> onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormProfileDetail onShowProfile={onResetShowProfile} />
          </form>
        )}
      </Form>

      {showProfile ? (
        <Box
          sx={{
            p: 4,
            m: "2rem",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            bgcolor: "background.paper",
            color: "black",
            width: 400,
          }}
        >
          <h2>First name: {profile?.firstName}</h2>
          <h2>Last name: {profile?.lastName}</h2>
          <h2>Age: {profile?.age}</h2>
        </Box>
      ) : undefined}
    </>
  );
};
