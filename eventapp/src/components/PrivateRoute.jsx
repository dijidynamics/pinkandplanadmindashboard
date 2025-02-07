import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const username = sessionStorage.getItem("username");

  if (!username) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
