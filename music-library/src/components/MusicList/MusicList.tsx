import "./styles.scss";
import { observer } from "mobx-react-lite";
import { Music } from "../../types/music";
import { MusicListItem } from "../MusicListItem/MusicListItem";
import loupe from "../../assets/loupe.png";
import { useMemo, useState } from "react";
import { searchMusic } from "../../utils/music";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MusicListProps {
  musicList: Music[];
  canEdit?: boolean;
  userLibrary?: boolean;
}

export const MusicList = observer((props: MusicListProps) => {
  const { musicList, canEdit, userLibrary } = props;

  const [searchValue, setSearchValue] = useState<string>("");

  const navigate = useNavigate();

  const handleSearchValueOnChange = (value: string) => {
    setSearchValue(value);
    console.log(value);
  };

  const filterMusic: Music[] = useMemo(() => {
    if (searchValue !== "") {
      return [...searchMusic(musicList, searchValue)].sort(
        (a, b) => b.id - a.id,
      );
    } else {
      return [...musicList].sort((a, b) => b.id - a.id);
    }
  }, [musicList, searchValue]);

  const handleAddButtonClick = () => {
    navigate("/user-library/add-music");
  };

  const setSearchTag = (tag: string) => {
    if (tag) {
      setSearchValue(tag);
    }
  };

  return (
    <div className="MusicList">
      <div className="searchBar">
        <img src={loupe} alt="loupe" />
        <input
          onChange={(event) => handleSearchValueOnChange(event.target.value)}
          value={searchValue}
        />
        {userLibrary && (
          <Button className="addButton" onClick={handleAddButtonClick}>
            Add new music
          </Button>
        )}
      </div>
      {filterMusic.map((music) => (
        <div className="listItem" key={music.id}>
          <MusicListItem
            music={music}
            canEdit={canEdit === undefined ? false : canEdit}
            userLibrary={userLibrary === undefined ? false : userLibrary}
            setSearchTag={setSearchTag}
          />
        </div>
      ))}
    </div>
  );
});
