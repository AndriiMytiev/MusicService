import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MusicEditBlock } from "../../components/MusicEditBlock/MusicEditBlock";
import { Music } from "../../types/music";

export const MusicEditPage = observer(() => {
  const {
    globalStore: { isEditPageAvailable },
    musicStore: { getMusicByID },
  } = useStore();

  const [music, setMusic] = useState<Music | null>(null);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!isEditPageAvailable) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const userData = await getMusicByID(+params.id);
        setMusic(userData);
      } else {
        setMusic(null);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="MusicEditPage page">
      <div className="container">
        {music && <MusicEditBlock music={music} />}
      </div>
    </div>
  );
});
