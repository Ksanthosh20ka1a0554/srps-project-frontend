import { useNavigate, useParams } from "react-router-dom";

import "./index.css";
import { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  failure: "FAILURE",
  success: "SUCCESS",
};

const SignupVerifyPage = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(apiConstants.initial);
  const [serverMsg, setServerMsg] = useState("");

  const params = useParams();

  useEffect(() => {
    verifyUserEmail();
    //eslint-disable-next-line
  }, []);

  const verifyUserEmail = async () => {
    try {
      setIsVerifying(apiConstants.inProgress);
      const url = "http://localhost:3030/auth/verify-user-email-srps";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.token}`,
          Accept: "application/json",
        },
      };
      const response = await fetch(url, options);
      if (response.ok) {
        const responseJson = await response.json();
        setIsVerifying(apiConstants.success);
        setServerMsg(responseJson.message);
        navigate("/login-user-srps", { replace: true });
      } else {
        const responseJson = await response.json();
        setIsVerifying(apiConstants.failure);
        setServerMsg(responseJson.message);
      }
    } catch (error) {
      setIsVerifying(apiConstants.failure);
      console.log(error.message);
      setServerMsg(error.message);
    }
  };

  const renderLoadingView = () => {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Hourglass
          visible={true}
          height="54"
          width="54"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    );
  };

  const renderFailureView = () => {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="user-mail-verification-icon-container">
          <img
            src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png"
            alt="errorIcon"
            className="user-mail-verification-icon"
          />
        </div>
        <h3 className="user-mail-verification-head">
          Oops! Something went wrong. Try Again
        </h3>
        <p className="user-mail-verification-text">{serverMsg}</p>
      </div>
    );
  };

  const checkingDisplaying = () => {
    switch (isVerifying) {
      case apiConstants.inProgress:
        return renderLoadingView();

      case apiConstants.failure:
        return renderFailureView();

      default:
        return null;
    }
  };

  return (
    <div className="user-mail-verification-container">
      {checkingDisplaying()}
    </div>
  );
};

export default SignupVerifyPage;
