import { Button } from "@mui/material";

type IMyButtonProps = {
  label: string;
  onClick: () => void;
};

export const MyButton = (props: IMyButtonProps) => {
  const { label, onClick } = props;

  return <Button onClick={onClick}>{label}</Button>;
};
