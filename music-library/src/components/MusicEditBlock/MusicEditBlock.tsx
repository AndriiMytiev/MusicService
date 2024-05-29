import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { Button } from "@mui/material";
import CustomTextField from "../Common/CustomTextField";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Music } from "../../types/music";
import { User } from "../../types/user";
import defaultAvatar from "../../assets/defaultAvatar.jpg";

interface MusicEditBlockProps {
  music: Music;
}

export const MusicEditBlock = observer((props: MusicEditBlockProps) => {
  const { music } = props;

  const {
    usersStore: { getUserByID },
    musicStore: { processMusicEditing },
    globalStore: { setIsEditPageAvailable },
  } = useStore();

  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");

  const [author, setAuthor] = useState<string>("");
  const [authorError, setAuthorError] = useState<string>("");

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (music.user) {
        const userData = await getUserByID(music.user);
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    fetchData();
  }, [music.user]);

  const onTitleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  const onAuthorValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAuthor(value);
  };

  const onTagsValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setTags(value.trim().split(/[\s,\/]+/));
  };

  const handleEditInfoButtonClick = () => {
    const newMusic: Music = {
      id: music.id,
      user: music.user,
      title: title,
      fileName: music.fileName,
      author: author,
      tags: tags,
    };

    if (title !== "" && author !== "") {
      processMusicEditing(newMusic);
      setIsEditPageAvailable(false);
      navigate("/");
    }
  };

  const onTitleBlur = () => {
    if (title === "") {
      setTitleError("Please enter new title");
    } else {
      console.log(title);
    }
  };

  const onAuthorBlur = () => {
    if (author === "") {
      setAuthorError("Please enter new author");
    } else {
      console.log(author);
    }
  };

  return (
    <div className="MusicEditBlock">
      {user && (
        <div className="userInfo">
          <div className="avatar">
            <img src={defaultAvatar} alt="userAvatar" />
          </div>
          <div className="name">
            {user?.name !== null && user?.surname !== null ? (
              <p>
                {user?.name} {user?.surname} ({user.login})
              </p>
            ) : (
              <p>{user?.login}</p>
            )}
          </div>
        </div>
      )}
      <div className="infoBlock">
        <p className="musicId">Editing Music#{music.id}</p>
        <div className="flexWrapper">
          <div className="inputBlock">
            <CustomTextField
              value={title}
              onChange={onTitleValueChange}
              label="Title"
              color={"warning"}
              helperText={titleError}
              onBlur={onTitleBlur}
            />
          </div>
          <div className="inputBlock">
            <CustomTextField
              value={author}
              onChange={onAuthorValueChange}
              label="Author"
              color={"warning"}
              helperText={authorError}
              onBlur={onAuthorBlur}
            />
          </div>
        </div>
        <div className="inputBlock">
          <p className="title">Additional tags: </p>
          <p className="helper">(example: tag1, tag2, tag3)</p>
          <textarea onChange={(event) => onTagsValueChange(event)} />
        </div>
        <Button onClick={handleEditInfoButtonClick} className="editInfo">
          Edit info
        </Button>
      </div>
    </div>
  );
});
