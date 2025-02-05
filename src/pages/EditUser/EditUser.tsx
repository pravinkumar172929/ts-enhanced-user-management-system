import React, { useContext } from "react";
import UserForm from "../../components/UserForm/UserForm";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";

const EditUser: React.FC = () => {
  const userContext = useContext(UserContext);
  const { id } = useParams();

  const { users } = userContext;

  const clickedUser = users.find((user) => user.id === Number(id));

  if (!clickedUser) {
    return <p>User doesn't exist!!</p>;
  }

  return (
    <>
      <UserForm clickedUser={clickedUser} />
    </>
  );
};

export default EditUser;
