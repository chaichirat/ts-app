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
  useMediaQuery,
  useTheme,
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
  width: {
    xs: 300, // mobile
    sm: 400, // tablet
    md: 400, // laptop
  },
  height: {
    xs: 480, // mobile
    sm: 360, // tablet
  },
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  p: {
    xs: 3, // mobile
    sm: 4, // tablet
    md: 6, // laptop
  },
  color: "black",
};

export const PageSignIn = () => {
  const router = useRouter();
  const theme = useTheme();

  // Responsive check
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 900px
  const isLaptop = useMediaQuery(theme.breakpoints.up("md")); // >900px

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

  return (
    <>
      <Box sx={style}>
        <Box
          display="flex"
          flexDirection="column"
          gap={isMobile ? "32px" : "16px"}
          justifyContent="center"
          height="100%"
        >
          <h1
            className="sign-in"
            style={{
              fontSize: isMobile ? "2.5rem" : "3rem",
              textAlign: "center",
            }}
          >
            Sign in
          </h1>
          <Box display="flex" flexDirection="column" gap="16px">
            <TextField
              error={emailError}
              label="Email"
              type="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              helperText={emailHelperText}
              fullWidth
            />
            <FormControl error={passwordError} fullWidth>
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
          </Box>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="space-between"
            gap={isMobile ? 1 : 0}
          >
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <a className="forgot-pass" href="#">
              <span>Forgot Password?</span>
            </a>
          </Box>

          <Button
            type="submit"
            variant="contained"
            onClick={onSubmit}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Box>

      <SnackBar onOpen={openSnackbar} onClose={closeSnackBar} />
    </>
  );
};
