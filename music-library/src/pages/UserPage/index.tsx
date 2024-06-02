import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../types/user";
import { UserPageBlock } from "../../components/UserPageBlock/UserPageBlock";

export const UserPage = observer(() => {
  const {
    globalStore: { currentUser, setIsEditPageAvailable },
    usersStore: { getUserByID },
  } = useStore();

  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const userData = await getUserByID(+params.id);
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    setIsEditPageAvailable(false);
  }, []);

  return (
    <div className="UserPage page">
      <div className="container">{user && <UserPageBlock user={user} />}</div>
    </div>
  );
});
