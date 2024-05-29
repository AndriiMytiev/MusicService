import "./styles.scss";
import { observer } from "mobx-react-lite";
import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { useMemo } from "react";
import { User } from "../../types/user";
import { MusicList } from "../MusicList/MusicList";
import { Music } from "../../types/music";
import { useStore } from "../../hooks/useStore";

interface UserPageBlockProps {
  user: User;
}

export const UserPageBlock = observer((props: UserPageBlockProps) => {
  const { user } = props;
  const {
    musicStore: { music },
  } = useStore();

  const currentMusicList: Music[] = useMemo(() => {
    return music.filter((music) => music.user === user?.id);
  }, [user, music]);

  return (
    <div className="UserPageBlock">
      <div className="userInfo">
        <div className="avatar">
          <img src={defaultAvatar} alt="userAvatar" />
        </div>
        <div className="name">
          {user?.name !== null && user?.surname !== null ? (
            <p>
              Welcome to{" "}
              <span>
                {user?.name} {user?.surname} ({user.login})
              </span>{" "}
              library!
            </p>
          ) : (
            <p>
              Welcome to <span>{user?.login}</span> library!
            </p>
          )}
        </div>
      </div>
      <div className="library">
        <MusicList musicList={currentMusicList} />
      </div>
    </div>
  );
});
