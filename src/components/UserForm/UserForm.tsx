import React, { useState } from "react";
import ErrorComponent from "../Error/ErrorComponent";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
  });
  const [error, setError] = useState<null | string>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/usersjj`,
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
    }
  };

  if (error) return <ErrorComponent message={error} />;

  return (
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
      <button onClick={submitHandler}>Add User</button>
    </>
  );
};

export default UserForm;
