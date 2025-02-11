import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Something wrong!!");
  }
  const { login } = authContext;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Your email here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Login;
