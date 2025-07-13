import { useCallback, useState } from "react";
import { Form } from "react-final-form";
import { TextField } from "../../../components/field-form";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

type IProfileType = {
  firstName: string;
  lastName: string;
  age: string;
};

export const FormProfile = () => {
  const [user, setUser] = useState<IProfileType>();

  const onSubmit = useCallback((values: IProfileType) => {
    console.log("Form submitted with values:", values);
    setUser(values);
  }, []);

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
    return errors;
  }, []);

  return (
    <>
      <Form<IProfileType> onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                p: 4,
                gap: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                width: 400,
              }}
            >
              <TextField name="firstName" label="First Name" />
              <TextField name="lastName" label="Last Name" />
              <TextField name="age" label="Age" />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Form>

      {user && (
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
          <h2>First name: {user?.firstName}</h2>
          <h2>Last name: {user?.lastName}</h2>
          <h2>Age: {user?.age}</h2>
        </Box>
      )}
    </>
  );
};
