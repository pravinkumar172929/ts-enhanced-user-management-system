import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Login.module.css";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
const { formContainer, inputField, button, errorMessage } = styles;

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

  // const [userInput, setUserInput] = useState<UserInputProps>({
  //   email: "",
  //   password: "",
  // });

  // const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserInput({ ...userInput, [e.target.name]: e.target.value });
  // };

  const loginHandler = async (inputValues: UserInputProps) => {
    // e.preventDefault();
    await login(inputValues.email, inputValues.password);
  };

  // interface TestInput {
  //   testName: string;
  //   testEmail: string;
  // }
  // const testSchema = yup.object().shape({
  //   testName: yup.string().required("Name is required"),
  //   testEmail: yup.string().email("Invalid email").required("Email required"),
  // });
  const inputValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Name is Required"),
    password: yup.string().required("Password is Required"),
  });

  return (
    <div className={formContainer}>
      <h1>Login</h1>
      {/* <Formik<TestInput>
        initialValues={{ testName: "", testEmail: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={testSchema}
      >
        <Form>
          <Field type="text" name="testName" placeholder="test name" />
          <ErrorMessage
            name="testName"
            component="p"
            className={errorMessage}
          />
          <Field type="text" name="testEmail" placeholder="test email" />
          <ErrorMessage
            name="testEmail"
            component="p"
            className={errorMessage}
          />
          <button type="submit">submit</button>
        </Form>
      </Formik> */}
      <Formik
        onSubmit={(values) => {
          console.log(values);
          loginHandler(values);
        }}
        validationSchema={inputValidationSchema}
        initialValues={{ email: "", password: "" }}
      >
        <Form>
          <Field
            type="text"
            name="email"
            placeholder="Your email here..."
            className={inputField}
          />
          <ErrorMessage name="email" component="p" className={errorMessage} />
          <Field
            type="text"
            name="password"
            placeholder="Your password..."
            className={inputField}
          />
          <ErrorMessage
            name="password"
            component="p"
            className={errorMessage}
          />
          <button type="submit" className={button}>
            Login
          </button>
        </Form>
      </Formik>
      {/* <input
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
      </button> */}
    </div>
  );
};

export default Login;
