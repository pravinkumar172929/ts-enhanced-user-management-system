import React from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
const { header, navbarList, navbarListItem, navbarTitle } = styles;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToAddUser = () => {
    navigate("/add-user");
  };

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
            <li className={navbarListItem} onClick={goToLogin}>
              Login
            </li>
            <li className={navbarTitle}>User Management System</li>
            <li className={navbarListItem} onClick={goToAddUser}>
              Add User
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
