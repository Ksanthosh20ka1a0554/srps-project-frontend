import "./index.css";

import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import ErrorFallbackPage from "../errorFallbackPage";

const PasswordResetPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [passwordText, setPasswordText] = useState({
    password: "",
    passwordRequiredText: "",
  });

  const [confirmPasswordText, setConfirmPasswordText] = useState({
    password: "",
    passwordRequiredText: "",
  });

  const [serverResMsg, setServerResMsg] = useState({
    messageText: "",
    messageTextColor: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(false);

  const changeThePassword = (event) => {
    const passwordInput = event.target.value;

    setServerResMsg((prevState) => ({
      ...prevState,
      messageText: "",
      messageTextColor: "",
    }));

    if (passwordInput === "") {
      setPasswordText((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else {
      let passwordTest =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,12}$/;
      if (!passwordTest.test(passwordText.password)) {
        setPasswordText((prevState) => ({
          ...prevState,
          password: passwordInput,
          passwordRequiredText: "Invalid Password",
        }));
      } else {
        setPasswordText((prevState) => ({
          ...prevState,
          password: passwordInput,
          passwordRequiredText: "",
        }));
      }
    }
  };

  const changeTheConfirmPassword = (event) => {
    const passwordInput = event.target.value;

    setServerResMsg((prevState) => ({
      ...prevState,
      messageText: "",
      messageTextColor: "",
    }));

    if (passwordInput === "") {
      setConfirmPasswordText((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else {
      if (passwordInput !== passwordText.password) {
        setConfirmPasswordText((prevState) => ({
          ...prevState,
          password: passwordInput,
          passwordRequiredText:
            "Confirm password and Password fields must be same",
        }));
      } else {
        setConfirmPasswordText((prevState) => ({
          ...prevState,
          password: passwordInput,
          passwordRequiredText: "",
        }));
      }
    }
  };

  const resetTheUserPassword = async () => {
    try {
      setIsSubmitButtonActive(true);
      const url = "http://localhost:3030/auth/user-password-reset";
      const { token } = params;

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: passwordText.password,
        }),
      };
      const serverRes = await fetch(url, options);
      const resJsonData = await serverRes.json();

      if (serverRes.status === 200) {
        navigate("/login-user-srps", { replace: true });
        setServerResMsg((prevState) => ({
          ...prevState,
          messageText: resJsonData.message,
          messageTextColor: "success-msg-color",
        }));
        setIsSubmitButtonActive(true);
      } else {
        setServerResMsg((prevState) => ({
          ...prevState,
          messageText: resJsonData.message,
          messageTextColor: "",
        }));
        setIsSubmitButtonActive(false);
      }
    } catch (error) {
      console.log(error.message);
      setServerResMsg((prevState) => ({
        ...prevState,
        messageText: error.message,
        messageTextColor: "",
      }));
    }
    setPasswordText((prevState) => ({
      ...prevState,
      password: "",
      passwordRequiredText: "",
    }));
    setConfirmPasswordText((prevState) => ({
      ...prevState,
      password: "",
      passwordRequiredText: "",
    }));
  };

  const validateFormData = () => {
    let passwordTest =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,12}$/;
    if (passwordText.password === "") {
      setPasswordText((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else if (confirmPasswordText.password === "") {
      setConfirmPasswordText((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else if (!passwordTest.test(passwordText.password)) {
      setPasswordText((prevState) => ({
        ...prevState,
        passwordRequiredText: "Invalid password",
      }));
    } else if (confirmPasswordText.password !== passwordText.password) {
      setConfirmPasswordText((prevState) => ({
        ...prevState,
        passwordRequiredText: "Password and Confirm Password must be Same",
      }));
    } else {
      resetTheUserPassword();
    }
  };

  const submitTheForm = (event) => {
    event.preventDefault();

    validateFormData();
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
      <div className="password-reset-page-main-container">
        <div className="password-reset-form-card">
          <div className="password-reset-logo-image-container">
            <p className="password-reset-logo-name">
              Solar Rotary Packing System
            </p>
          </div>
          <form
            className="password-reset-form-element"
            onSubmit={submitTheForm}
          >
            <div className="d-flex flex-column justify-content-center mt-1 mb-1">
              <label className="password-reset-label" htmlFor="resetPassword">
                Password
              </label>
              <div className="password-reset-input-password-container">
                <input
                  className="password-reset-input-password-ele"
                  id="resetPassword"
                  placeholder="Enter Your Password"
                  type={showPassword ? "text" : "password"}
                  value={passwordText.password}
                  onChange={changeThePassword}
                />
                <button
                  className="password-reset-password-eye-icon-button"
                  type="button"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
              <p className="password-reset-required-text">
                {passwordText.passwordRequiredText}
              </p>
              <ul className="password-reset-password-points-list">
                <li>Password must contain at least one upper case letter.</li>
                <li>Password must contain at least one lower case letter.</li>
                <li>Password must contain at least one numeric digit.</li>
                <li>
                  Password must contain at least one special @.#$!%*?&^
                  character.
                </li>
              </ul>
            </div>
            <div className="d-flex flex-column justify-content-center mt-1 mb-1">
              <label
                className="password-reset-label"
                htmlFor="resetConfirmPassword"
              >
                Confirm Password
              </label>
              <div className="password-reset-input-password-container">
                <input
                  className="password-reset-input-password-ele"
                  id="resetConfirmPassword"
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPasswordText.password}
                  onChange={changeTheConfirmPassword}
                />
                <button
                  className="password-reset-password-eye-icon-button"
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prevState) => !prevState)
                  }
                >
                  {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
              <p className="password-reset-required-text">
                {confirmPasswordText.passwordRequiredText}
              </p>
            </div>
            <div className="password-reset-submit-button-container">
              <button
                className={
                  !isSubmitButtonActive
                    ? "password-reset-submit-button"
                    : "password-reset-submit-button password-reset-submit-button-inactive"
                }
                type="submit"
                disabled={isSubmitButtonActive}
              >
                Submit
              </button>
            </div>
            <p
              className={`password-reset-required-text ${serverResMsg.messageTextColor}`}
            >
              {serverResMsg.messageText}
            </p>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PasswordResetPage;
