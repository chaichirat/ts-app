import { Alert, Snackbar } from "@mui/material";

type ISnackBarProps = {
  onOpen: boolean;
  onClose: () => void;
};

export const SnackBar = (props: ISnackBarProps) => {
  const { onOpen, onClose } = props;

  return (
    <>
      <Snackbar
        open={onOpen}
        autoHideDuration={3000}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={onClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Sign in success.
        </Alert>
      </Snackbar>
    </>
  );
};
