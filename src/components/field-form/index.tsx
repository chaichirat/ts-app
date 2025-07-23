import { ImageUpdate } from "./ImageField";
import { Selector, type ISelectorProps } from "./selector/SelectField";
import { makeField } from "./tool";
import { TextField as TextFieldMUI } from "@mui/material";

export const TextField = makeField(TextFieldMUI);
export const ImageField = makeField(ImageUpdate);
export const SelectField = makeField<ISelectorProps>(Selector);
