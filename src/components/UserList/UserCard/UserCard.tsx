import React from "react";
import proFilePic from "../../../assets/profilepic/blank-avatar-photo-place-holder-600nw-1095249842.webp";
import styles from "./userCard.module.css";

const { profileContainer, profileName, profileEmail } = styles;

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={profileContainer}>
      <img src={proFilePic} alt="profile-pic" />
      <span className={profileName}>{user.name}</span>
      <span className={profileEmail}>{user.email}</span>
      <button>View Details</button>
      <button>Edit User</button>
    </div>
  );
};

export default UserCard;
