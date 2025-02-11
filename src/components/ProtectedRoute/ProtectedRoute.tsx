import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute: React.FC<{ allowedRoles: string[] }> = ({
  allowedRoles,
}) => {
  const authContxt = useContext(AuthContext);
  if (!authContxt?.userAuth) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(authContxt.userAuth.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
