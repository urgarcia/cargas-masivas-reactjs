
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/authContext";

function AdminWrapper(props) {
  const auth = useContext(AuthContext);
  if (auth.user.roles[0].id != 1) {
    return <Navigate to="/" replace />;
  }
  return props.children;
}
export default AdminWrapper;
