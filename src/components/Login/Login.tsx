import React from "react";

const Login: React.FC = () => {
  return (
    <div>
      <input type="text" placeholder="Your email here..." />
      <input type="password" placeholder="Your password..." />
      <button>Login</button>
    </div>
  );
};

export default Login;
