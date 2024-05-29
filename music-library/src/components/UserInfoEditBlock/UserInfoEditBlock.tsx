import "./styles.scss";
import { observer } from "mobx-react-lite";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { Button } from "@mui/material";
import { User } from "../../types/user";
import { useStore } from "../../hooks/useStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTextField from "../Common/CustomTextField";
import { useRegistrationValidator } from "../../hooks/useRegistrationValidator";
import { validateNameSurname } from "../../utils/auth";

interface UserInfoEditBlockProps {
  user: User;
}

export const UserInfoEditBlock = observer((props: UserInfoEditBlockProps) => {
  const { user } = props;

  const {
    globalStore: { currentUser, setIsEditPageAvailable, setCurrentUser },
    usersStore: { processUserEditing, processUserDeleting, getUsers },
  } = useStore();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [info, setInfo] = useState("");

  const {
    validationError: nameValidationError,
    activateValidator: activateNameValidator,
    performValidation: performNameValidation,
  } = useRegistrationValidator(validateNameSurname);

  const {
    validationError: surnameValidationError,
    activateValidator: activateSurnameValidator,
    performValidation: performSurnameValidation,
  } = useRegistrationValidator(validateNameSurname);

  const onNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
    performNameValidation(value);
  };

  const onSurnameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSurname(value);
    performSurnameValidation(value);
  };

  const onInfoValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setInfo(value);
  };

  const handleEditInfoButtonClick = () => {
    let shouldReturn = false;
    if (name === "" || nameValidationError !== null) {
      activateNameValidator(name);
      shouldReturn = true;
    }
    if (surname === "" || surnameValidationError !== null) {
      activateSurnameValidator(surname);
      shouldReturn = true;
    }
    if (shouldReturn) {
      return;
    }

    const newUser: User = {
      id: user.id,
      login: user.login,
      password: user.password,
      name: name !== "" ? name : user.name,
      surname: surname !== "" ? surname : user.surname,
      info: info.trim(),
      favorites: user.favorites,
      admin: isAdmin !== null && currentUser?.admin ? isAdmin : user.admin,
    };

    processUserEditing(newUser);
    setIsEditPageAvailable(false);
    setTimeout(() => {
      getUsers();
      if (currentUser?.id === newUser.id) {
        setCurrentUser(newUser);
        navigate("/profile");
      } else {
        navigate("/users");
      }
    }, 10);
  };

  const onNameFieldBlur = () => {
    if (nameValidationError !== "") {
      activateNameValidator(name);
    }
  };

  const onSurnameFieldBlur = () => {
    if (surname !== "") {
      activateSurnameValidator(surname);
    }
  };

  const handleDeleteButtonClick = (id: number) => {
    processUserDeleting(id);
    setIsEditPageAvailable(false);
    setTimeout(() => {
      getUsers();
      navigate("/users");
    }, 10);
  };

  return (
    <div className="UserInfoEditBlock">
      <div className="avatarBlock">
        <div className="avatar">
          <img src={defaultAvatar} alt="avatar" />
        </div>
        {currentUser?.admin && currentUser.id !== user.id && (
          <Button
            onClick={() => handleDeleteButtonClick(user.id)}
            className="deleteButton"
          >
            Delete User #{user.id}
          </Button>
        )}
      </div>
      <div className="infoBlock">
        <p className="userId">Editing User#{user.id}</p>
        <div className="inputBlock">
          <CustomTextField
            value={name}
            onChange={onNameValueChange}
            label="Name"
            error={nameValidationError !== null}
            color={"warning"}
            helperText={nameValidationError}
            onBlur={onNameFieldBlur}
          />
        </div>
        <div className="inputBlock">
          <CustomTextField
            value={surname}
            onChange={onSurnameValueChange}
            label="Surname"
            error={surnameValidationError !== null}
            color={"warning"}
            helperText={surnameValidationError}
            onBlur={onSurnameFieldBlur}
          />
        </div>
        {currentUser?.admin && currentUser.id !== user.id && (
          <div className="userRole">
            <p>Role: </p>
            <div className="roleButtons">
              <Button
                className={isAdmin ? "" : "active"}
                onClick={() => setIsAdmin(false)}
              >
                User
              </Button>
              <Button
                className={isAdmin ? "active" : ""}
                onClick={() => setIsAdmin(true)}
              >
                Admin
              </Button>
            </div>
          </div>
        )}
        <div className="inputBlock">
          <p className="title">Additional info: </p>
          <textarea onChange={(event) => onInfoValueChange(event)} />
        </div>
        <Button onClick={handleEditInfoButtonClick} className="editInfo">
          Edit info
        </Button>
      </div>
    </div>
  );
});
