import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MusicList } from "../../components/MusicList/MusicList";
import { Music } from "../../types/music";

export const UserFavoritesPage = observer(() => {
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
    if (currentUser) {
      return music.filter((el) => currentUser.favorites.includes(el.id));
    } else {
      return [];
    }
  }, [currentUser, music]);

  return (
    <div className="UserFavoritesPage page">
      <div className="container">
        <MusicList musicList={currentMusicList} />
      </div>
    </div>
  );
});
