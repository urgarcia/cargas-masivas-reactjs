
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/authContext";

function AuthWrapper(props) {
  const auth = useContext(AuthContext);
  if (!auth.user) {
    return <Navigate to="/admin/login" replace />;
  }
  return props.children;
}
export default AuthWrapper;
