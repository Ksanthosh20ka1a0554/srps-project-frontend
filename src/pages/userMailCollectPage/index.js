import "./index.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackPage from "../../pages/errorFallbackPage";

const UserMailCollectPage = () => {
  const [emailText, setEmailText] = useState({
    email: "",
    emailRequiredText: "",
  });

  const [serverResMsg, setServerResMsg] = useState({
    messageText: "",
    messageTextColor: "",
  });

  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false);

  const changeTheEmail = (event) => {
    const emailInput = event.target.value;

    setServerResMsg((prevState) => ({
      ...prevState,
      messageText: "",
      messageTextColor: "",
    }));

    if (emailInput === "") {
      setEmailText((prevState) => ({
        ...prevState,
        email: "",
        emailRequiredText: "Required*",
      }));
    } else {
      if (isEmail(emailInput)) {
        setEmailText((prevState) => ({
          ...prevState,
          email: emailInput,
          emailRequiredText: "",
        }));
      } else {
        setEmailText((prevState) => ({
          ...prevState,
          email: emailInput,
          emailRequiredText: "Invalid Email",
        }));
      }
    }
  };

  const checkEmailTheUser = async () => {
    try {
      setIsSubmitButtonActive(true);
      const url = "http://localhost:3030/auth/user-password-mail-check-reset";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailText.email,
        }),
      };
      const serverRes = await fetch(url, options);
      const resJsonData = await serverRes.json();

      if (serverRes.status === 200) {
        setServerResMsg((prevState) => ({
          ...prevState,
          messageText: resJsonData.message,
          messageTextColor: "success-msg-color",
        }));
      } else {
        setServerResMsg((prevState) => ({
          ...prevState,
          messageText: resJsonData.message,
          messageTextColor: "",
        }));
      }
    } catch (error) {
      console.log(error.message);
      setServerResMsg((prevState) => ({
        ...prevState,
        messageText: error.message,
        messageTextColor: "",
      }));
    }
    setEmailText((prevState) => ({
      ...prevState,
      email: "",
      emailRequiredText: "",
    }));
    setIsSubmitButtonActive(false);
  };

  const validateFormData = () => {
    if (emailText.email === "") {
      setEmailText((prevState) => ({
        ...prevState,
        email: "",
        emailRequiredText: "Required*",
      }));
    } else if (!isEmail(emailText.email)) {
      setEmailText((prevState) => ({
        ...prevState,
        email: "",
        emailRequiredText: "Invalid Email",
      }));
    } else {
      checkEmailTheUser();
    }
  };

  const submitTheForm = (event) => {
    event.preventDefault();

    validateFormData();
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
      <div className="mail-collect-page-main-container">
        <div className="mail-collect-form-card">
          <div className="mail-collect-logo-image-container">
            <p className="mail-collect-logo-name">
              Solar Rotary Packing System
            </p>
          </div>
          <form className="mail-collect-form-element" onSubmit={submitTheForm}>
            <div className="d-flex flex-column justify-content-center mt-1 mb-1">
              <label className="mail-collect-label" htmlFor="mailCollectEmail">
                Email
              </label>
              <input
                className="mail-collect-input-ele"
                id="mailCollectEmail"
                placeholder="Enter Your Email"
                type="text"
                value={emailText.email}
                onChange={changeTheEmail}
              />
              <p className="mail-collect-required-text">
                {emailText.emailRequiredText}
              </p>
            </div>
            <div className="mail-collect-submit-button-container">
              <button
                className={
                  !isSubmitButtonActive
                    ? "mail-collect-submit-button"
                    : "mail-collect-submit-button mail-collect-submit-button-inactive"
                }
                type="submit"
                disabled={isSubmitButtonActive}
              >
                Submit
              </button>
            </div>
            <p
              className={`mail-collect-required-text ${serverResMsg.messageTextColor}`}
            >
              {serverResMsg.messageText}
            </p>
          </form>
          <div className="mail-collect-already-have-account-container">
            <p className="mail-collect-already-have-account-text">
              Go to Signin Page{" "}
              <Link
                className="mail-collect-already-have-account-link"
                to={"/login-user-srps"}
              >
                Signin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default UserMailCollectPage;
