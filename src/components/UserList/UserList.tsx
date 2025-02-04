import React, { useContext, useEffect } from "react";
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
          goToUserProfile={() => navigate(`/user/${user.id}`)}
          goToEdit={() => navigate(`/edit-user/${user.id}`)}
        />
      ))}
    </div>
  );
};

export default UserList;
