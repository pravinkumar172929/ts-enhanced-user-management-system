import React, { useContext, useEffect } from "react";
import Loader from "../Loader/Loader";
import ErrorComponent from "../Error/ErrorComponent";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const { users, setUsers } = userContext;

  const { data, isLoading, error } = useFetch<User[]>(
    `https://jsonplaceholder.typicode.com/users`
  );

  // console.log(data, isLoading, error);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  const goToUserProfile = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const goToEdit = (userId: number) => {
    // console.log(userId);
    navigate(`/edit-user/${userId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <>
      {users.map((user: User) => (
        <div key={user.id}>
          <span>{user.name}</span> - <span>{user.email}</span>
          <button
            onClick={() => {
              goToUserProfile(user.id);
            }}
          >
            View
          </button>
          <button
            onClick={() => {
              goToEdit(user.id);
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </>
  );
};

export default UserList;
