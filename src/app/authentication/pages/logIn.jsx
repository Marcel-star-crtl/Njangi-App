import { useState } from "react";
import {
  FacebookOutlined,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Paper,
  Button,
  FormControl,
  InputAdornment,
  FilledInput,
  IconButton,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { backgroundImageWoman, logo } from "../../../assets/index";
import { appName, routeNames } from "../../../utils";
import { useUserAuth } from "../../../context/UserAuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { logIn, googleSignIn } = useUserAuth();
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (email === "") {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    setLoginPassword(event.target.value);
    if (loginPassword !== "") {
      setPasswordError("");
    }
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");

      // input validation
      if (loginPassword === "") {
        setPasswordError("Please enter password");
      }

      if (email === "") {
        setEmailError("Please enter email");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError("Please enter valid email");
      } else if (email !== "" && loginPassword !== "") {
        //signin with email and password
        await logIn(email, password);
        navigate(routeNames.home);
      }
    }catch(err){
      setError("An error occured:")
    } 
  }
  
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate(routeNames.home);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Stack
      className="dark-bg-image"
      direction={{ xs: 'column-reverse', md: 'row' }}
      spacing={{ xs: 2, md: 1 }}
      justifyContent='center'
      alignItems='center'
      sx={{
        height: "100vh",
        width: "100vw",
        paddingY: { xs: 3, md: 0 },
        backgroundImage: `url(${backgroundImageWoman})`,
        overflowY: 'auto'
      }}
    >
      <Box
        sx={{
          marginBottom: { xs: '300px', md: 0 }
        }}
      >
        <Paper className="form-card">
          <Box component="form" onSubmit={handleFormSubmit} noValidate>
            <Stack spacing={2} className="form-card-content">
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <img src={logo} className="logo-s3" alt="Fund Savy logo" />
                <Typography
                  className="title-text"
                  variant="h5"
                  color="primary"
                  textTransform="uppercase"
                >
                  {appName}
                </Typography>
              </Stack>
              <Typography
                variant="h4"
                color="white"
                className="title-text"
                align="center"
              >
                Log Into {appName}
              </Typography>
              <Typography color="white" variant="h6">
                New here? <Link to={routeNames.signUp}>Create New Account</Link>
              </Typography>
              <TextField
                sx={{ flexGrow: 1 }}
                id="email"
                type="text"
                label="Enter Email"
                variant="filled"
                className="light-input-field"
                value={email}
                helperText={emailError}
                error={emailError !== ""}
                required
                onChange={handleEmailChange}
              />

              <FormControl
                variant="filled"
                className="light-input-field"
                helperText={passwordError}
                error={passwordError !== ""}
                required
              >
                <InputLabel htmlFor="loginPassword">Enter Password</InputLabel>
                <FilledInput
                  id="loginPassword"
                  value={loginPassword}
                  onChange={handlePasswordChange}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "white" }} />
                        ) : (
                          <Visibility sx={{ color: "white" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="component-error-text">
                  {passwordError}
                </FormHelperText>
              </FormControl>
              <Link to="">Forgot password?</Link>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ padding: "10px" }}
              >
                sign in
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                }}
                size="large"
                onClick={handleGoogleSignIn}
              >
                <Google sx={{ color: "red" }} />
                <Typography sx={{ marginLeft: 1 }}>
                  Signin with Google
                </Typography>
              </Button>

              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                }}
                size="large"
              >
                <FacebookOutlined sx={{ color: "blue" }} />
                <Typography sx={{ marginLeft: 1 }}>
                  Signin with Facebook
                </Typography>
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "25px",
        }}
      >
        <Stack alignItems="center" sx={{ maxWidth: 500 }}>
          <img src={logo} alt="logo" className="logo-s1" width={100} />
          <Typography variant="h6" align="center" color="white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis
            quidem temporibus magnam est voluptate obcaecati iure nihil earum
            qui enim.
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

export default LoginPage;