import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MusicAddBlock } from "../../components/MusicAddBlock/MusicAddBlock";

export const MusicAddPage = observer(() => {
  const {
    globalStore: { currentUser, setIsEditPageAvailable },
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

  return (
    <div className="MusicAddPage page">
      <div className="container">
        <MusicAddBlock />
      </div>
    </div>
  );
});
