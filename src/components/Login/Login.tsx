import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Login.module.css";
const { formContainer, inputField, button } = styles;

interface UserInputProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Something wrong!!");
  }
  const { login } = authContext;

  const [userInput, setUserInput] = useState<UserInputProps>({
    email: "",
    password: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(userInput.email, userInput.password);
  };

  return (
    <div className={formContainer}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Your email here..."
        value={userInput.email}
        onChange={changeHandler}
        className={inputField}
        name="email"
      />
      <input
        type="password"
        placeholder="Your password..."
        value={userInput.password}
        onChange={changeHandler}
        className={inputField}
        name="password"
      />
      <button onClick={loginHandler} className={button}>
        Login
      </button>
    </div>
  );
};

export default Login;
