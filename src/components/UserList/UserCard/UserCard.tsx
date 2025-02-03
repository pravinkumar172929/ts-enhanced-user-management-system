import React from "react";
import proFilePic from "../../../assets/profilepic/blank-avatar-photo-place-holder-600nw-1095249842.webp";
import styles from "./userCard.module.css";

const { profileContainer, profileName, profileEmail } = styles;

const UserCard: React.FC = () => {
  return (
    <div className={profileContainer}>
      <img src={proFilePic} alt="profile-pic" />
      <span className={profileName}>Dan Joe</span>
      <span className={profileEmail}>danJoe@fake.com</span>
      <button>View Details</button>
      <button>Edit User</button>
    </div>
  );
};

export default UserCard;
