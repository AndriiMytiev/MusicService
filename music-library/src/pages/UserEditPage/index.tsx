import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserInfoEditBlock } from "../../components/UserInfoEditBlock/UserInfoEditBlock";
import { User } from "../../types/user";

export const UserEditPage = observer(() => {
  const {
    globalStore: { isEditPageAvailable },
    usersStore: { getUserByID },
  } = useStore();

  const [user, setUser] = useState<User | null>(null);

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
        const userData = await getUserByID(+params.id);
        setUser(userData);
      } else {
        setUser(null);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="UserEditPage page">
      <div className="container">
        {user && <UserInfoEditBlock user={user} />}
      </div>
    </div>
  );
});
