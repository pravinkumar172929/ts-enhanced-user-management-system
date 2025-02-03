import React, { useState } from "react";
import ErrorComponent from "../Error/ErrorComponent";
import Loader from "../Loader/Loader";
import { User } from "../../types/userTypes";
import styles from "./userForm.module.css";
import { useNavigate } from "react-router-dom";

const { formContainer, successMessageStyle, inputField, button } = styles;

interface UserFormProps {
  clickedUser: User | undefined;
}

type UserFormData = Pick<User, "name" | "email" | "phone" | "website">;

const UserForm: React.FC<UserFormProps> = ({ clickedUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserFormData>({
    name: !clickedUser ? "" : clickedUser.name,
    email: !clickedUser ? "" : clickedUser.email,
    phone: clickedUser ? clickedUser.phone : "",
    website: clickedUser ? clickedUser.website : "",
  });
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setsuccessMessage] = useState<null | string>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/usershh`,
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
      setsuccessMessage(
        `User with ${createdUser.name} ${
          clickedUser ? "Updated" : "Created"
        } successfully!`
      );
      setUser({ name: "", email: "", phone: "", website: "" });

      setTimeout(() => {
        setsuccessMessage(null);
        navigate("/");
      }, 1000);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <ErrorComponent message={error} />;

  return (
    <div className={formContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>User Form</h1>
          {successMessage && (
            <p className={successMessageStyle}>{successMessage}</p>
          )}
          <input
            type="text"
            placeholder="Your Full Name..."
            name="name"
            onChange={changeHandler}
            value={user.name}
            className={inputField}
          />
          <input
            type="email"
            placeholder="Your Email..."
            name="email"
            onChange={changeHandler}
            value={user.email}
            className={inputField}
          />
          <input
            type="text"
            placeholder="Your Phone..."
            name="phone"
            onChange={changeHandler}
            value={user.phone}
            className={inputField}
          />
          <input
            type="text"
            placeholder="Your Website..."
            name="website"
            onChange={changeHandler}
            value={user.website}
            className={inputField}
          />
          <button className={button} onClick={submitHandler}>
            {clickedUser ? "Update" : "Add"} User
          </button>
        </>
      )}
    </div>
  );
};

export default UserForm;
