import "./styles.scss";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { useStore } from "../../../hooks/useStore";
import userIcon from "../../../assets/user.png";

export const Header = observer(() => {
  const {
    globalStore: { currentUser },
  } = useStore();
  return (
    <div className="Header">
      <div className="container">
        <div className="nav">
          <NavLink to="/">
            <p>Main library</p>
          </NavLink>
          <NavLink to="/user-library">
            <p>My library</p>
          </NavLink>
          <NavLink to="/favorites">
            <p>My favorites</p>
          </NavLink>
          <NavLink to="/profile">
            <p>My profile</p>
          </NavLink>
          <NavLink to="/users">
            <p>All users</p>
          </NavLink>
        </div>
        <div className="loginUser">
          {currentUser?.name !== null && currentUser?.surname !== null ? (
            <p>
              {currentUser?.name} {currentUser?.surname}{" "}
              {currentUser?.admin && "(admin)"}
            </p>
          ) : (
            <p>
              {currentUser?.login} {currentUser?.admin && "(admin)"}
            </p>
          )}

          <div className="userIcon">
            <img src={userIcon} alt="userIcon" />
          </div>
        </div>
      </div>
    </div>
  );
});
