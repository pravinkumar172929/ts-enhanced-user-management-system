import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ErrorComponent from "../Error/ErrorComponent";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

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
        setUsersData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (error) return <ErrorComponent message={error} />;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {usersData.map((user) => (
            <div key={user.id}>
              <span>{user.name}</span> - <span>{user.email}</span>
              <button>View</button>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default UserList;
