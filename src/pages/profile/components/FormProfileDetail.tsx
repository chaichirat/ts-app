import {
  useCallback,
  
  type ChangeEvent,
} from "react";

import { TextField } from "../../../components/field-form";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useCustomForm } from "../../../components/field-form/use-form";
import type { IProfileType } from "./FormProfile";

export const FormProfileDetail = () => {

    const { change  } = useCustomForm<IProfileType>();

    const onChange = useCallback(
        (values: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          console.log("Change values:", values.target.value);
          change('lastName', values.target.value);
        },
        [change]
    );

    return (
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
        <TextField
        name="firstName"
        label="First Name"
        onChange={onChange}
        />
        <TextField name="lastName" label="Last Name" />
        <TextField type="number" name="age" label="Age" />
        <Button type="submit" variant="contained">
        Submit
        </Button>
    </Box>
    )
}