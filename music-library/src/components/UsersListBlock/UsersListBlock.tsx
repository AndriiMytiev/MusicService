import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import loupe from "../../assets/loupe.png";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user";
import { searchUsers } from "../../utils/users";

export const UsersListBlock = observer(() => {
  const {
    usersStore: { users, getUsers },
    globalStore: { currentUser, setIsEditPageAvailable },
  } = useStore();

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const sortedUsers: User[] = useMemo(() => {
    const newUsers = users.slice().sort((a, b) => a.id - b.id);
    if (searchValue !== "") {
      return searchUsers(newUsers, searchValue);
    } else {
      return newUsers;
    }
  }, [users, searchValue]);

  const navigate = useNavigate();

  const handleEditUserButtonClick = (id: number) => {
    setIsEditPageAvailable(true);
    navigate(`/users/edit/${id}`);
  };

  const handleSearchValueOnChange = (value: string) => {
    setSearchValue(value);
  };

  const handleUserClick = (id: number) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="UsersList">
      <div className="searchBar">
        <img src={loupe} alt="loupe" />
        <input
          onChange={(event) => handleSearchValueOnChange(event.target.value)}
        />
      </div>
      <div className="listWrapper">
        {sortedUsers.map((user) => {
          return (
            <div className="listItem" key={user.id}>
              <div className="avatar">
                <img src={defaultAvatar} alt="userAvatar" />
              </div>
              <div className="info">
                {user?.name !== null && user?.surname !== null ? (
                  <p onClick={() => handleUserClick(user.id)}>
                    {user?.name} {user?.surname} ({user.login})
                  </p>
                ) : (
                  <p onClick={() => handleUserClick(user.id)}>{user?.login}</p>
                )}
              </div>
              {currentUser?.admin && (
                <Button
                  className="editUser"
                  onClick={() => handleEditUserButtonClick(user.id)}
                >
                  Edit User #{user.id}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
