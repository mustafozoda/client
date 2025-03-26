import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthStore();
  // console.log("User:", user);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
