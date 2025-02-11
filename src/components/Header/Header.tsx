import React, { useContext } from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const { header, navbarList, navbarListItem, navbarTitle } = styles;

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("There is problem!!");
  }
  const { userAuth, logout } = authContext;
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  // const goToAddUser = () => {
  //   navigate("/add-user");
  // };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <header className={header}>
        <nav>
          <ul className={navbarList}>
            <li className={navbarListItem} onClick={goToHome}>
              Home
            </li>
            {userAuth ? (
              <li className={navbarListItem} onClick={logout}>
                Logout
              </li>
            ) : (
              <li className={navbarListItem} onClick={goToLogin}>
                Login
              </li>
            )}
            <li className={navbarTitle}>User Management System</li>
            {/* <li className={navbarListItem} onClick={goToAddUser}>
              Add User
            </li> */}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
