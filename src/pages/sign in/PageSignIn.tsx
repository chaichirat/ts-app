import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { paths } from "../../constans/path";
import { useRouter } from "../../utills/router";
import { SnackBar } from "../../components/SnackBar";
import { emails } from "../../constans/emails";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: 6,
  color: "black",
};

export const PageSignIn = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const closeSnackBar = useCallback(() => {
    setOpenSnackbar(false);
  }, [openSnackbar]);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show);
  }, [showPassword]);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const handleMouseUpPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const validate = () => {
    let isValid = true;

    const foundUser = emails.find((u) => u.email === emailValue);

    if (emailValue === "") {
      setEmailHelperText("Please enter your email.");
      setEmailError(true);
      isValid = false;
    } else if (!foundUser) {
      setEmailHelperText("Invalid email ! Please try again.");
      setEmailError(true);
      isValid = false;
    } else {
      setEmailHelperText("");
      setEmailError(false);
    }

    if (foundUser) {
      if (passwordValue === "") {
        setPasswordHelperText("Please enter your password.");
        setPasswordError(true);
        isValid = false;
      } else if (passwordValue !== foundUser.password) {
        setPasswordHelperText("Invalid password ! Please try again.");
        setPasswordError(true);
        isValid = false;
      } else {
        setPasswordHelperText("");
        setPasswordError(false);
      }
    }
    return isValid;
  };

  const onSubmit = () => {
    const isValid = validate();

    if (isValid) {
      setOpenSnackbar(true);
      setTimeout(() => {
        router.push(paths.home);
      }, 1000);
    }
  };

  //   useEffect(() => {
  //     setEmailValue("");
  //     setPasswordValue("");
  //     setEmailHelperText("");
  //     setPasswordHelperText("");
  //     setEmailError(false);
  //     setPasswordError(false);
  //   }, []);

  return (
    <>
      <Box sx={style}>
        <Box display="flex" flexDirection="column" gap="16px">
          <h1 className="sign-in">Sign in</h1>
          <TextField
            error={emailError}
            label="Email"
            type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            helperText={emailHelperText}
          />
          <FormControl error={passwordError}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText>{passwordHelperText}</FormHelperText>
          </FormControl>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <a className="forgot-pass" href="#">
              <span>Forgot Password?</span>
            </a>
          </Box>
          <Button type="submit" variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </Box>

      <SnackBar onOpen={openSnackbar} onClose={closeSnackBar} />
    </>
  );
};
