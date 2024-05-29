import "./styles.scss";
import { observer } from "mobx-react-lite";
import AuthBlock from "../../components/AuthPageComponents/AuthBlock";
import Logo from "../../assets/logo.png";
import { useEffect } from "react";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

export const AuthPage = observer(() => {
  const {
    globalStore: { currentUser, setIsEditPageAvailable },
  } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    setIsEditPageAvailable(false);
  }, [setIsEditPageAvailable]);

  return (
    <div className="AuthPage">
      <div className="authPageTitle">
        <img src={Logo} alt="logo" />
        <h1>
          Welcome to <span>HarmonyHub</span>!
        </h1>
      </div>
      <AuthBlock />
    </div>
  );
});
