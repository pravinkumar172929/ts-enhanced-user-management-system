import React, { useState } from "react";
import ErrorComponent from "../Error/ErrorComponent";
import Loader from "../Loader/Loader";

interface User {
  // id: number;
  name: string;
  email: string;
}

interface UserFormProps {
  clickedUser: User | undefined;
}

const UserForm: React.FC<UserFormProps> = ({ clickedUser }) => {
  // console.log(clickedUser);

  const [user, setUser] = useState<User>(
    clickedUser || {
      // id: 0,
      name: "",
      email: "",
    }
  );
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(user),
        }
      );
      if (!response.ok) {
        throw new Error(`There is Error!!: ${response.status}`);
      }
      const createdUser = await response.json();
      console.log(createdUser);
      alert("User Created");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <ErrorComponent message={error} />;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>User Form</h1>
          <input
            type="text"
            placeholder="Your Full Name..."
            name="name"
            onChange={changeHandler}
            value={user.name}
          />
          <input
            type="email"
            placeholder="Your Email..."
            name="email"
            onChange={changeHandler}
            value={user.email}
          />
          <button onClick={submitHandler}>
            {clickedUser ? "Update" : "Add"} User
          </button>
        </>
      )}
    </>
  );
};

export default UserForm;
