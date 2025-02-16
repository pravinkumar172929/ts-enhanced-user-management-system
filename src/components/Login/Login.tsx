import React, { useContext } from "react";
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

  const loginHandler = async (inputValues: UserInputProps) => {
    await login(inputValues.email, inputValues.password);
  };

  const inputValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("Name is Required"),
    password: yup.string().required("Password is Required"),
  });

  return (
    <div className={formContainer}>
      <h1>Login</h1>
      <Formik
        onSubmit={(values) => {
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
    </div>
  );
};

export default Login;
