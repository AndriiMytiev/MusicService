import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { Button } from "@mui/material";
import CustomTextField from "../Common/CustomTextField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { uploadFile } from "../../utils/music";

export const MusicAddBlock = observer(() => {
  const {
    musicStore: { processMusicCreating },
    globalStore: { currentUser },
  } = useStore();

  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");

  const [author, setAuthor] = useState<string>("");
  const [authorError, setAuthorError] = useState<string>("");

  const [tags, setTags] = useState<string[]>([]);

  const [file, setFile] = useState<File | undefined>();
  const [uploadError, setUploadError] = useState<string>("");

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

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
  };

  const onTitleBlur = () => {
    if (title === "") {
      setTitleError("Please enter new title");
    } else {
      setUploadError("");
    }
  };

  const onAuthorBlur = () => {
    if (author === "") {
      setAuthorError("Please enter new author");
    } else {
      setAuthorError("");
    }
  };

  const handleAddButtonClick = () => {
    if (file && currentUser && title && author) {
      uploadFile(file);
      processMusicCreating({
        user: currentUser.id,
        title: title,
        fileName: file.name,
        author: author,
        tags: tags,
      });
      setTimeout(() => {
        setUploadError("");
        navigate("/");
      }, 1000);
    } else {
      setUploadError("Please upload file!");
    }
  };

  return (
    <div className="MusicEditBlock">
      {currentUser && (
        <div className="userInfo">
          <div className="avatar">
            <img src={defaultAvatar} alt="userAvatar" />
          </div>
          <div className="name">
            {currentUser?.name !== null && currentUser?.surname !== null ? (
              <p>
                {currentUser?.name} {currentUser?.surname} ({currentUser?.login}
                )
              </p>
            ) : (
              <p>{currentUser?.login}</p>
            )}
          </div>
        </div>
      )}
      <div className="infoBlock">
        <p className="musicId">Add new music</p>
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
        <div className="flexWrapper">
          <div className="inputBlock">
            <p className="title">Additional tags: </p>
            <p className="helper">(example: tag1, tag2, tag3)</p>
            <textarea onChange={(event) => onTagsValueChange(event)} />
          </div>
          <div className="inputBlock">
            <p className="title">Select MP3 file: </p>
            <input
              type="file"
              id="mp3File"
              accept=".mp3"
              onChange={onFileChange}
              required
            />
            <p className="uploadError">{uploadError}</p>
          </div>
        </div>
        <Button onClick={handleAddButtonClick} className="addButton">
          Add new music post
        </Button>
      </div>
    </div>
  );
});
