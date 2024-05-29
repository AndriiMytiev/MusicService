import { AccountCircle, Email, Lock } from "@mui/icons-material";
import { Box, Button, InputAdornment, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useRegistrationValidator } from "../../hooks/useRegistrationValidator";
import CustomTextField from "../Common/CustomTextField";
import { validateLogin, validatePassword } from "../../utils/auth";

const RegistrationBlock = observer(() => {
  const {
    palette: {
      text: { primary },
    },
  } = useTheme();

  const {
    authStore: {
      login,
      password,
      setLogin,
      setPassword,
      processRegistration,
      setAuthPageStateToLogin,
      registrationError,
    },
  } = useStore();

  const {
    validationError: loginValidationError,
    activateValidator: activateLoginValidator,
    performValidation: performLoginValidation,
  } = useRegistrationValidator(validateLogin);

  const {
    validationError: passwordValidationError,
    activateValidator: activatePasswordValidator,
    performValidation: performPasswordValidation,
  } = useRegistrationValidator(validatePassword);

  const onLoginValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLogin(value);
    performLoginValidation(value);
  };

  const onPasswordValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setPassword(value);
    performPasswordValidation(value);
  };

  const onCreateAccountButtonClick = () => {
    let shouldReturn = false;
    if (login === "" || loginValidationError !== null) {
      activateLoginValidator(login);
      shouldReturn = true;
    }
    if (password === "" || passwordValidationError !== null) {
      activatePasswordValidator(password);
      shouldReturn = true;
    }
    if (shouldReturn) {
      return;
    }
    processRegistration();
  };

  const onAlreadyHaveAccountClick = () => {
    setAuthPageStateToLogin();
  };

  const onLoginFieldBlur = () => {
    if (login !== "") {
      activateLoginValidator(login);
    }
  };

  const onPasswordFieldBlur = () => {
    if (password !== "") {
      activatePasswordValidator(password);
    }
  };

  return (
    <>
      <h1>Registration</h1>
      <div>
        <CustomTextField
          value={login}
          onChange={onLoginValueChange}
          label="Login"
          error={loginValidationError !== null}
          color={"warning"}
          helperText={
            registrationError
              ? "Login is already taken. Please choose another login"
              : loginValidationError
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle color="primary" />
              </InputAdornment>
            ),
          }}
          onBlur={onLoginFieldBlur}
        />
        <CustomTextField
          value={password}
          onChange={onPasswordValueChange}
          label="Password"
          type="password"
          color={"warning"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="primary" />
              </InputAdornment>
            ),
          }}
          error={passwordValidationError !== null}
          helperText={passwordValidationError}
          onBlur={onPasswordFieldBlur}
        />
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 5,
          marginBottom: 2,
        }}
      >
        <Button
          sx={{ fontSize: 20 }}
          variant="contained"
          fullWidth
          onClick={onCreateAccountButtonClick}
          className="primaryButton"
        >
          Create an Account
        </Button>
        <Button
          sx={{
            marginTop: 2,
            textDecoration: "underline",
            fontSize: 12,
            color: primary,
          }}
          onClick={onAlreadyHaveAccountClick}
          variant="text"
        >
          I already have an account
        </Button>
      </Box>
    </>
  );
});

export default RegistrationBlock;
