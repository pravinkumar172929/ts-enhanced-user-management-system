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
  const { users } = userContext;
  const clickedUser: User | undefined = users.find(
    (user) => user.id === Number(id)
  );

  if (!clickedUser) {
    return <p>So Such user</p>;
  }

  const {
    name,
    username,
    email,
    phone,
    website,
    company: { name: companyName, catchPhrase },
    address: { street, suite, city, zipcode },
  } = clickedUser;

  return (
    <div className={profileContainer}>
      <img
        className={profileImage}
        src={`https://i.pravatar.cc/150?u=${id}`}
        alt="User Profile"
      />
      <h3 className={userName}>{clickedUser.name}</h3>
      <h4 className={userDetails}>Username: {username}</h4>
      <h4 className={userDetails}>Email: {email}</h4>
      <h4 className={userDetails}>Phone: {phone}</h4>
      <h4 className={userDetails}>Website: {website}</h4>
      <h4 className={userDetails}>Company: {companyName}</h4>
      <p className={address}>
        <strong>Address:</strong> {street}, {suite}, {city} - {zipcode}
      </p>
      <p className={address}>
        <strong>Company Motto:</strong> "{catchPhrase}"
      </p>
    </div>
  );
};

export default UserProfile;
