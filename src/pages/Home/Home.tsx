import React, { useContext } from "react";
import UserList from "../../components/UserList/UserList";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Error!");
  }

  const { userAuth } = authContext;

  return (
    <>
      <h1>Welcome to User Management System</h1>
      {!userAuth ? (
        <>
          <p>You need to login to access features</p>
          <button
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
      <UserList />
    </>
  );
};

export default Home;
