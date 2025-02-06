import React, { useState } from "react";
import ErrorComponent from "../Error/ErrorComponent";
import Loader from "../Loader/Loader";
import { User } from "../../types/userTypes";
import styles from "./userForm.module.css";
import { useNavigate } from "react-router-dom";
// import usePost from "../../hooks/usePost";
import useFetch from "../../hooks/useFetch";

const {
  formContainer,
  successMessageStyle,
  inputField,
  button,
  errorContainer,
} = styles;

interface UserFormProps {
  clickedUser: User | undefined;
}

type UserFormData = Pick<User, "name" | "email" | "phone" | "website">;

const UserForm: React.FC<UserFormProps> = ({ clickedUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserFormData>({
    name: clickedUser ? clickedUser.name : "",
    email: clickedUser ? clickedUser.email : "",
    phone: clickedUser ? clickedUser.phone : "",
    website: clickedUser ? clickedUser.website : "",
  });
  const [successMessage, setSuccessMessage] = useState<null | string>(null);

  const { data, isLoading, error, fetchData } = useFetch<UserFormData>(
    `https://jsonplaceholder.typicode.com/users`
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchData(user);

    if (!error) {
      setSuccessMessage(
        `User ${clickedUser ? "Updated" : "created"} Successfully`
      );
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  if (error)
    return (
      <div className={errorContainer}>
        <ErrorComponent message={error} />
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    );

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
