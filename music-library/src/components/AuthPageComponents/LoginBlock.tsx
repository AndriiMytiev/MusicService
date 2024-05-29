import { AccountCircle, Lock } from "@mui/icons-material";
import { Box, Button, InputAdornment, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import CustomTextField from "../Common/CustomTextField";

const LoginBlock = observer(() => {
  const {
    palette: {
      text: { primary },
    },
  } = useTheme();

  const {
    authStore: {
      login,
      password,
      loginError,
      setLogin,
      setPassword,
      processLogin,
      setAuthPageStateToRegistration,
    },
  } = useStore();

  const onLoginValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const onPasswordValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword(event.target.value);
  };

  const onLoginButtonClick = () => {
    processLogin();
  };

  const onRegistrationButtonClick = () => {
    setAuthPageStateToRegistration();
  };

  return (
    <>
      <h1>Login</h1>
      <div>
        <CustomTextField
          label="Login"
          value={login}
          onChange={onLoginValueChange}
          color={"warning"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <CustomTextField
          label="Password"
          type="password"
          value={password}
          onChange={onPasswordValueChange}
          color={"warning"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="primary" />
              </InputAdornment>
            ),
          }}
          helperText={loginError && "Invalid login or password"}
        />
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 5,
          marginBottom: 2,
        }}
      >
        <Button
          sx={{ fontSize: 20 }}
          variant="contained"
          fullWidth
          onClick={onLoginButtonClick}
          className="primaryButton"
        >
          Login
        </Button>
        <Button
          sx={{
            marginTop: 2,
            textDecoration: "underline",
            fontSize: 12,
            color: primary,
          }}
          onClick={onRegistrationButtonClick}
          variant="text"
        >
          Don't have an account? Registration
        </Button>
      </Box>
    </>
  );
});

export default LoginBlock;
