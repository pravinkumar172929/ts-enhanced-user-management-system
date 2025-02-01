import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const userContext = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  // console.log(id);
  if (!useContext) {
    return <p>UserContext is not available</p>;
  }
  const { users } = userContext;
  const clickedUser: User | undefined = users.find(
    (user) => user.id === Number(id)
  );

  if (!clickedUser) {
    return <p>So Such user</p>;
  }
  // console.log(clickedUser);

  return (
    <>
      <h1>UserProfile</h1>
      <h3>User Name: {clickedUser.name} </h3>
      <h4>User Email: {clickedUser.email}</h4>
    </>
  );
};

export default UserProfile;
