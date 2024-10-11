// src/components/PrivateRoute.js
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component }) => {
  const token = localStorage.getItem("token");

  return token ? (
    Component
  ) : (
    <Navigate to="/login" replace /> // Redirect to login if not authenticated
  );
};

export default PrivateRoute;
