import React, { useContext, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ErrorComponent from "../Error/ErrorComponent";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const userContext = useContext(UserContext);
  // console.log(userContext);

  // const [usersData, setUsersData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  if (!useContext) {
    throw new Error("User Context is not availble");
  }

  const { users, setUsers } = userContext;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );
        if (!response.ok) {
          throw new Error(`Error!! Something went wrong: ${response.status}`);
        }
        const result: User[] = await response.json();
        // console.log(result);
        setUsers(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (error) return <ErrorComponent message={error} />;

  const goToUserProfile = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const goToEdit = () => {
    navigate("/edit-user");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
              <button onClick={goToEdit}>Edit</button>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default UserList;
