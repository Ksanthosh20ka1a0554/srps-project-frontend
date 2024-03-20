import { useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackPage from "../errorFallbackPage";
import LoginCompo from "../../components/loginCompo";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("srps-login-token");
    if (token !== undefined) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
      <div className="login-page-main-container">
        <LoginCompo />
      </div>
    </ErrorBoundary>
  );
};

export default LoginPage;
