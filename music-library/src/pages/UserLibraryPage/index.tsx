import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MusicList } from "../../components/MusicList/MusicList";
import { Music } from "../../types/music";

export const UserLibraryPage = observer(() => {
  const {
    globalStore: { currentUser, setIsEditPageAvailable },
    musicStore: { music, getMusic },
  } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    setIsEditPageAvailable(false);
  }, [setIsEditPageAvailable]);

  useEffect(() => {
    getMusic();
  }, [getMusic]);

  const currentMusicList: Music[] = useMemo(() => {
    return music.filter((music) => music.user === currentUser?.id);
  }, [currentUser, music]);

  return (
    <div className="UserLibraryPage page">
      <div className="container">
        <MusicList
          musicList={currentMusicList}
          canEdit={true}
          userLibrary={true}
        />
      </div>
    </div>
  );
});
