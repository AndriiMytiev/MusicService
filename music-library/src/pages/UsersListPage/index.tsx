import "./styles.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UsersListBlock } from "../../components/UsersListBlock/UsersListBlock";

export const UsersListPage = observer(() => {
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
  }, []);

  return (
    <div className="UsersListPage page">
      <div className="container">
        <UsersListBlock />
      </div>
    </div>
  );
});
