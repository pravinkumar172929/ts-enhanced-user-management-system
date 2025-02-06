import React from "react";
import styles from "./userCard.module.css";
import { User } from "../../../types/userTypes";

const { profileContainer, profileName, profileEmail } = styles;

interface UserCardProps {
  user: User;
  goToUserProfile: () => void;
  goToEdit: () => void;
}

const UserCard: React.FC<UserCardProps> = React.memo(
  ({ user, goToUserProfile, goToEdit }) => {
    return (
      <div className={profileContainer}>
        <img
          src={`https://i.pravatar.cc/150?u=${user.id}`}
          alt="User Profile"
        />
        <span className={profileName}>{user.name}</span>
        <span className={profileEmail}>{user.email}</span>
        <button onClick={goToUserProfile}>View Details</button>
        <button onClick={goToEdit}>Edit User</button>
      </div>
    );
  }
);

export default UserCard;
