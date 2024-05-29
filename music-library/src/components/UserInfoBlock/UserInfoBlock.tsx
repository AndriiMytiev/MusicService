import "./styles.scss";
import { observer } from "mobx-react-lite";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { Button } from "@mui/material";
import { User } from "../../types/user";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";

interface UserInfoBlockProps {
  user: User;
  loginUser: boolean;
}

export const UserInfoBlock = observer((props: UserInfoBlockProps) => {
  const { user, loginUser } = props;

  const {
    globalStore: { setCurrentUser, setIsEditPageAvailable },
    authStore: { setAuthPageStateToLogin },
  } = useStore();

  const navigate = useNavigate();

  const handleLogoutButtonClick = () => {
    setAuthPageStateToLogin();
    setCurrentUser(null);
  };

  const handleEditInfoButtonClick = (user: User) => {
    setIsEditPageAvailable(true);
    navigate(`/users/edit/${user.id}`);
  };

  return (
    <div className="UserInfoBlock">
      <div className="avatarBlock">
        <div className="avatar">
          <img src={defaultAvatar} alt="avatar" />
        </div>
        {loginUser && (
          <Button onClick={handleLogoutButtonClick} className="logoutButton">
            Logout
          </Button>
        )}
      </div>
      <div className="infoBlock">
        <div className="name">
          <p>Name: {user.name ? <span>{user.name}</span> : " - "}</p>
          <p>Surname: {user.surname ? <span>{user.surname}</span> : " - "}</p>
        </div>
        <div className="info">
          <p>
            Login: <span>{user.login}</span>
          </p>
        </div>
        <div className="info">
          <p>
            Role: <span>{user.admin ? "admin" : "user"}</span>
          </p>
        </div>
        {user.info && (
          <div className="info">
            <p className="extraInfo">Additional information:</p>
            <p>
              <span className="m0">{user.info}</span>
            </p>
          </div>
        )}
        {loginUser && (
          <Button
            onClick={() => handleEditInfoButtonClick(user)}
            className="editInfo"
          >
            Edit info
          </Button>
        )}
      </div>
    </div>
  );
});
