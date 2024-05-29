import "./styles.scss";
import { observer } from "mobx-react-lite";
import { Music } from "../../types/music";
import { ref } from "firebase/storage";
import { storage } from "../../firebase";
import { useEffect, useState } from "react";
import { getMusicUrl } from "../../utils/music";
import ReactAudioPlayer from "react-audio-player";
import { User } from "../../types/user";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

interface MusicListItemProps {
  music: Music;
  canEdit: boolean;
  userLibrary: boolean;
  setSearchTag: (tag: string) => void;
}

export const MusicListItem = observer((props: MusicListItemProps) => {
  const { music, canEdit, userLibrary, setSearchTag } = props;
  const {
    globalStore: { currentUser, setIsEditPageAvailable },
    usersStore: { toggleFav },
    musicStore: { processMusicDeleting },
  } = useStore();

  const {
    usersStore: { getUserByID },
  } = useStore();

  const [audioUrl, setAudioUrl] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const musicRef = ref(storage, `music/${music.fileName}`);
  const navigate = useNavigate();

  useEffect(() => {
    const url = getMusicUrl(musicRef);
    url.then((r) => r !== undefined && r !== null && setAudioUrl(r));
  }, [music, musicRef]);

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
  }, [getUserByID, music.user]);

  const handleUserClick = (id: number | undefined) => {
    if (id) {
      navigate(`/users/${id}`);
    }
  };

  const handleMusicEditClick = (id: number) => {
    setIsEditPageAvailable(true);
    navigate(`/edit-music/${id}`);
  };

  const handleDeleteButtonClick = (music: Music) => {
    processMusicDeleting(music);
    navigate("/");
  };

  const handleTagClick = (tag: string) => {
    setSearchTag(tag);
  };

  return (
    <div className="MusicListItem">
      <p className="musicTitle">
        {music.title} - {music.author}
      </p>
      <ReactAudioPlayer src={audioUrl} controls={true} volume={0.3} />
      <div className="tags">
        {music.tags.map((tag, index) => {
          return (
            <p key={tag + index} onClick={() => handleTagClick(tag)}>
              #{tag}
            </p>
          );
        })}
      </div>
      <div className="buttons">
        <div>
          <Button onClick={() => toggleFav(music.id)}>
            {currentUser?.favorites?.includes(music.id)
              ? "Delete from fav"
              : "Add to fav"}
          </Button>
          {music.user === currentUser?.id && canEdit && (
            <Button
              onClick={() => handleMusicEditClick(music.id)}
              className="edit"
            >
              Edit
            </Button>
          )}
          {currentUser?.admin && !canEdit && (
            <Button
              onClick={() => handleMusicEditClick(music.id)}
              className="edit"
            >
              Edit
            </Button>
          )}
        </div>
        {music.user === currentUser?.id && userLibrary && (
          <button
            onClick={() => handleDeleteButtonClick(music)}
            className="deleteButton"
          >
            ✖
          </button>
        )}
        {currentUser?.admin && !userLibrary && (
          <button
            onClick={() => handleDeleteButtonClick(music)}
            className="deleteButton"
          >
            ✖
          </button>
        )}
      </div>

      <div className="uploadBy">
        {user && user?.name !== null && user?.surname !== null ? (
          <p>
            Upload by{" "}
            <span onClick={() => handleUserClick(user?.id)}>
              {user.name} {user.surname} ({user.login})
            </span>
          </p>
        ) : (
          <p>
            Upload by{" "}
            <span onClick={() => handleUserClick(user?.id)}>{user?.login}</span>
          </p>
        )}
      </div>
    </div>
  );
});
