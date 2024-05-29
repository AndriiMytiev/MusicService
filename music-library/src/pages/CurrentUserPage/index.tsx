import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfoBlock } from "../../components/UserInfoBlock/UserInfoBlock";

export const CurrentUserPage = observer(() => {
  const {
    globalStore: { currentUser, setIsEditPageAvailable },
  } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    setIsEditPageAvailable(false);
  }, []);

  return (
    <div className="CurrentUserPage page">
      <div className="container">
        {currentUser && <UserInfoBlock user={currentUser} loginUser={true} />}
      </div>
    </div>
  );
});
