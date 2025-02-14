import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const { formContainer, inputField, button } = styles;

interface UserInputProps {
  email: string;
  password: string;
}

interface TestFormInputs {
  test: string;
  accountNumber: string;
}

const inputSchema = yup.object().shape({
  test: yup.string().required("Name required"),
  accountNumber: yup
    .string()
    .matches(/^\d{5}$/, "Account number must be exactly 5 digits") // Regex validation
    .required("Account number is required"),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TestFormInputs>({
    resolver: yupResolver(inputSchema),
    mode: "onChange",
  });
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

  const onSubmit = (data: TestFormInputs) => {
    console.log("submittedData => ", data.test);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("test")} />
        {errors.test && <p style={{ color: "red" }}>{errors.test.message}</p>}
        <input
          type="text"
          placeholder="Enter 5-digit account number"
          {...register("accountNumber")}
        />
        {errors.accountNumber && (
          <p style={{ color: "red" }}>{errors.accountNumber.message}</p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
