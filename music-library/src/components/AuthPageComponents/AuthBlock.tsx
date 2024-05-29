import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import LoginBlock from "./LoginBlock";
import RegistrationBlock from "./RegistrationBlock";
import { useEffect } from "react";

const AuthBlock = observer(() => {
  const {
    authStore: { state, setLoginError },
    usersStore: { users, getUsers },
  } = useStore();

  useEffect(() => {
    setLoginError(false);
  }, [state]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="authBlockContainer bottomGradientBorder">
      <div className="authBlockContent">
        {state === "login" && <LoginBlock />}
        {state === "registration" && <RegistrationBlock />}
      </div>
    </div>
  );
});

export default AuthBlock;
