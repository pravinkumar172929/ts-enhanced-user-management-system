import React from "react";
import styles from "./header.module.css";
const { header, navbarList, navbarListItem } = styles;

const Header: React.FC = () => {
  return (
    <>
      <header className={header}>
        <nav>
          <ul className={navbarList}>
            <li className={navbarListItem}>Home</li>
            <li className={navbarListItem}>User Profile</li>
            <li className={navbarListItem}>Add User</li>
            <li className={navbarListItem}>Edit User</li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
