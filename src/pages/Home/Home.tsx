import React, { useContext } from "react";
import UserList from "../../components/UserList/UserList";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
const { container, button, loginButton, addUserButton } = styles;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Error!");
  }

  const { userAuth } = authContext;

  return (
    <>
      <div className={container}>
        <h1>Welcome to User Management System</h1>
        {!userAuth ? (
          <>
            <p>You need to login to access features</p>
            <button
              className={`${button} ${loginButton}`}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h2>Welcome! You have been Logged in as {userAuth.name}</h2>
            {userAuth.role === "Admin" && (
              <>
                <h3>Click Here to add User</h3>
                <button
                  className={`${button} ${addUserButton}`}
                  onClick={() => {
                    navigate("/add-user");
                  }}
                >
                  Add User
                </button>
              </>
            )}
          </>
        )}
      </div>
      <UserList />
    </>
  );
};

export default Home;
