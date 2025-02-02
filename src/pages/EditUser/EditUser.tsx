import React, { useContext } from "react";
import UserForm from "../../components/UserForm/UserForm";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";

const EditUser: React.FC = () => {
  const userContext = useContext(UserContext);
  const { id } = useParams();
  // console.log(id);
  if (!userContext) {
    return <p>User Context not available</p>;
  }

  const { users } = userContext;
  // console.log(users);

  const clickedUser = users.find((user) => user.id === Number(id));
  // console.log(clickedUser);

  return (
    <>
      <UserForm />
    </>
  );
};

export default EditUser;
