import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  const jwtToken = Cookies.get("srps-login-token");

  if (jwtToken === undefined) {
    return <Navigate to={"/login-user-srps"} replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
