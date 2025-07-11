
import { useCallback } from "react";

import { Form } from "react-final-form";
import { TextField } from "../../../components/field-form";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

type IProfileType = {
  firstName: string;
  lastName: string;
}

export const FormProfile = () => {
    const onSubmit = useCallback((values: IProfileType) => {
    console.log("Form submitted with values:", values);
    }, []);

    const onValidate = useCallback((values: IProfileType) => {
        const errors: Partial<IProfileType> = {};
        if (!values.firstName) {
            errors.firstName = "First Name is required";
        }
        if (!values.lastName) {
            errors.lastName = "Last Name is required";
        }
        return errors;
    }, []);

    return  (
    <Form<IProfileType> onSubmit={onSubmit} validate={onValidate}>
        {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                <Box sx={{
                    p: 4,
                    gap: 2,
                    borderRadius:2,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                }}>
                    <TextField name="firstName" label="First Name" />
                    <TextField name="lastName" label="Last Name" />
                    <Button type="submit" variant="contained">Submit</Button>
                </Box>
            </form>
        )}
    </Form>)
}