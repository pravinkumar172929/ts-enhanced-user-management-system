import React, { useState } from "react";
import ErrorComponent from "../Error/ErrorComponent";
import Loader from "../Loader/Loader";
import { User } from "../../types/userTypes";

const UserForm: React.FC = () => {
  const [user, setUser] = useState<Partial<User>>({
    name: "",
    email: "",
  });
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<null | string>(null);

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
      setSuccessMessage("User Created Successfully!");
      setUser({ name: "", email: "" });
      // console.log(createdUser);
      setTimeout(() => {
        setSuccessMessage(null), 1000;
      });
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
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
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
      )}
    </>
  );
};

export default UserForm;
