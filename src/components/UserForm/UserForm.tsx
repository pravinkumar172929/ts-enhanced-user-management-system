import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    alert("User Created");
  };

  return (
    <>
      <h1>User Form</h1>
      <input
        type="text"
        placeholder="Your Full Name..."
        name="name"
        onChange={changeHandler}
        value={user.name}
      />
      <input
        type="email"
        placeholder="Your Email..."
        name="email"
        onChange={changeHandler}
        value={user.email}
      />
      <button onClick={submitHandler}>Add User</button>
    </>
  );
};

export default UserForm;
