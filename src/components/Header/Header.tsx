import React from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
const { header, navbarList, navbarListItem } = styles;

const Header: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToUser = () => {
    navigate("/user");
  };

  const goToAddUser = () => {
    navigate("/add-user");
  };

  const goToEditUser = () => {
    navigate("/edit-user");
  };

  return (
    <>
      <header className={header}>
        <nav>
          <ul className={navbarList}>
            <li className={navbarListItem} onClick={goToHome}>
              Home
            </li>
            <li className={navbarListItem} onClick={goToUser}>
              User Profile
            </li>
            <li className={navbarListItem} onClick={goToAddUser}>
              Add User
            </li>
            <li className={navbarListItem} onClick={goToEditUser}>
              Edit User
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
