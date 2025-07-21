import { useCallback } from "react";
import { Form } from "react-final-form";
import { Avatar, Box } from "@mui/material";
import { FormProfileDetail } from "./FormProfileDetail";

export type IProfileType = {
  firstName: string;
  lastName: string;
  age: string;
  image: string;
  showProfile: boolean;
  submittedValues: Partial<IProfileType>;
};

export const FormProfile = () => {
  const onSubmit = useCallback((values: IProfileType, form: any) => {
    console.log("Form submitted with values:", values);
    form.change("submittedValues", {
      firstName: values.firstName,
      lastName: values.lastName,
      age: values.age,
      image: values.image,
    });
    form.change("showProfile", true);
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
    console.log("Error:", errors);
    console.log("result", values);
    return errors;
  }, []);

  return (
    <>
      <Form<IProfileType>
        onSubmit={onSubmit}
        validate={onValidate}
        initialValues={{ showProfile: false }}
      >
        {({ handleSubmit, values }) => {
          const showInfo = values.submittedValues;
          return (
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={handleSubmit}
            >
              <FormProfileDetail />

              {values.showProfile ? (
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
                  <Box display="flex" justifyContent="center" width="100%">
                    <Avatar
                      src={showInfo.image}
                      sx={{ width: 100, height: 100 }}
                    ></Avatar>
                  </Box>
                  <h2>First name: {showInfo.firstName}</h2>
                  <h2>Last name: {showInfo.lastName}</h2>
                  <h2>Age: {showInfo.age}</h2>
                </Box>
              ) : undefined}
            </form>
          );
        }}
      </Form>
    </>
  );
};
