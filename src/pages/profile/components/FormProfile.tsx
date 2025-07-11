
import { useCallback } from "react";

import { Form } from "react-final-form";
import { TextField } from "../../../components/field-form";
import Button from "@mui/material/Button";

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

    return  (<Form<IProfileType> onSubmit={onSubmit} validate={onValidate}>
    {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
        <TextField name="firstName" label="First Name" />
        <TextField name="lastName" label="Last Name" />
        <Button type="submit">Submit</Button>
        </form>
    )}
    </Form>)
}