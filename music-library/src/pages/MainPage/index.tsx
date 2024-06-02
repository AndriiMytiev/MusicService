import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MusicList } from "../../components/MusicList/MusicList";

export const MainPage = observer(() => {
  const {
    globalStore: { currentUser, setIsEditPageAvailable },
    musicStore: { music, getMusic },
  } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/auth");
    }
    console.log(music)
  }, [currentUser, navigate]);

  useEffect(() => {
    setIsEditPageAvailable(false);
  }, [setIsEditPageAvailable]);

  useEffect(() => {
    getMusic();
  }, [getMusic]);

  return (
    <div className="MainPage page">
      <div className="container">
        <MusicList musicList={music} />
      </div>
    </div>
  );
});
