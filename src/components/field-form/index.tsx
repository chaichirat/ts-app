import { makeField } from "./tool";
import { TextField as TextFieldMUI, type TextFieldProps } from "@mui/material";

export const TextField = makeField<TextFieldProps>(TextFieldMUI);
