import React, { useState } from "react";
import ErrorComponent from "../Error/ErrorComponent";
import Loader from "../Loader/Loader";
import { User } from "../../types/userTypes";
import styles from "./userForm.module.css";
import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

const {
  formContainer,
  successMessageStyle,
  inputField,
  button,
  errorContainer,
  errorMessage,
} = styles;

interface UserFormProps {
  clickedUser: User | undefined;
}

type UserFormData = Pick<
  User,
  "name" | "email" | "phone" | "website" | "password"
>;

const UserForm: React.FC<UserFormProps> = ({ clickedUser }) => {
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState<null | string>(null);

  const { isLoading, error, postDataFunction } = usePost<UserFormData>(
    `http://localhost:4000/users`
  );

  const submitHandler = async (inputValues: UserFormData) => {
    await postDataFunction(inputValues);

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

  const userFormValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().required(),
    phone: yup.string().required("Phone number is required"),
    website: yup.string(),
  });

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
          <Formik<UserFormData>
            initialValues={{
              name: clickedUser ? clickedUser.name : "",
              email: clickedUser ? clickedUser.email : "",
              password: clickedUser ? clickedUser.password : "",
              phone: clickedUser ? clickedUser.phone : "",
              website: clickedUser ? clickedUser.website : "",
            }}
            onSubmit={(values) => {
              submitHandler(values);
            }}
            validationSchema={userFormValidationSchema}
          >
            <Form>
              <Field
                type="text"
                name="name"
                placeholder="Your Full Name..."
                className={inputField}
              />
              <ErrorMessage
                name="name"
                component="p"
                className={errorMessage}
              />
              <Field
                type="email"
                name="email"
                placeholder="Your Email..."
                className={inputField}
              />
              <ErrorMessage
                name="email"
                component="p"
                className={errorMessage}
              />
              <Field
                type="text"
                name="password"
                placeholder="Your Password..."
                className={inputField}
              />
              <ErrorMessage
                name="password"
                component="p"
                className={errorMessage}
              />
              <Field
                type="text"
                name="phone"
                placeholder="Your Phone..."
                className={inputField}
              />
              <ErrorMessage
                name="phone"
                component="p"
                className={errorMessage}
              />
              <Field
                type="text"
                name="website"
                placeholder="Your Website..."
                className={inputField}
              />
              <ErrorMessage
                name="website"
                component="p"
                className={errorMessage}
              />
              <button type="submit" className={button}>
                {clickedUser ? "Update" : "Add"} User
              </button>
            </Form>
          </Formik>
        </>
      )}
    </div>
  );
};

export default UserForm;
