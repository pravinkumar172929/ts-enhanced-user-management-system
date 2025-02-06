import React, { useCallback, useContext, useEffect } from "react";
import Loader from "../Loader/Loader";
import ErrorComponent from "../Error/ErrorComponent";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import UserCard from "./UserCard/UserCard";
import styles from "./userList.module.css";
import { User } from "../../types/userTypes";

const { userListContainer } = styles;

const UserList: React.FC = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const { users, setUsers } = userContext;

  const { data, isLoading, error } = useFetch<User[]>(
    `https://jsonplaceholder.typicode.com/users`
  );

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  const goToUserProfile = useCallback(
    (userId: number) => {
      navigate(`/user/${userId}`);
    },
    [navigate]
  );

  const goToEdit = useCallback(
    (userId: number) => {
      navigate(`/edit-user/${userId}`);
    },
    [navigate]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <div className={userListContainer}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          goToUserProfile={() => goToUserProfile(user.id)}
          goToEdit={() => goToEdit(user.id)}
        />
      ))}
    </div>
  );
};

export default React.memo(UserList);
