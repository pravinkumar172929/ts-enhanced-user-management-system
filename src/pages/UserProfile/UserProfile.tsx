import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { User } from "../../types/userTypes";
import styles from "./userProfile.module.css";

const { profileContainer, profileImage, userName, userDetails, address } =
  styles;

const UserProfile: React.FC = () => {
  const userContext = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  // console.log(id);
  // if (!useContext) {
  //   return <p>UserContext is not available</p>;
  // }
  const { users } = userContext;
  const clickedUser: User | undefined = users.find(
    (user) => user.id === Number(id)
  );

  if (!clickedUser) {
    return <p>So Such user</p>;
  }
  // console.log(clickedUser);

  return (
    <div className={profileContainer}>
      <img
        className={profileImage}
        src={`https://i.pravatar.cc/150?u=${clickedUser.id}`}
        alt="User Profile"
      />
      <h3 className={userName}>{clickedUser.name}</h3>
      <h4 className={userDetails}>Username: {clickedUser.username}</h4>
      <h4 className={userDetails}>Email: {clickedUser.email}</h4>
      <h4 className={userDetails}>Phone: {clickedUser.phone}</h4>
      <h4 className={userDetails}>Website: {clickedUser.website}</h4>
      <h4 className={userDetails}>Company: {clickedUser.company.name}</h4>
      <p className={address}>
        <strong>Address:</strong> {clickedUser.address.street},{" "}
        {clickedUser.address.suite}, {clickedUser.address.city} -{" "}
        {clickedUser.address.zipcode}
      </p>
      <p className={address}>
        <strong>Company Motto:</strong> "{clickedUser.company.catchPhrase}"
      </p>
    </div>
  );
};

export default UserProfile;
