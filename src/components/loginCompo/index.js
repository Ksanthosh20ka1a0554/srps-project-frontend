import "./index.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOff, IoEye } from "react-icons/io5";
import isEmail from "validator/lib/isEmail";
import Cookies from "js-cookie";

const LoginCompo = () => {
  const navigate = useNavigate();
  const [emailText, setEmailText] = useState({
    email: "",
    emailRequiredText: "",
  });

  const [passwordText, setPasswordText] = useState({
    password: "",
    passwordRequiredText: "",
  });

  const [serverResMsg, setServerResMsg] = useState({
    messageText: "",
    messageTextColor: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoginButtonActive, setIsLoginButtonActive] = useState(false);

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

  const goToHomePage = (data) => {
    const token = data.token;
    Cookies.set("srps-login-token", token);
    navigate("/", { replace: true });
  };

  const loginTheUser = async () => {
    try {
      setIsLoginButtonActive(true);
      const url = "http://localhost:3030/auth/login-user-srps";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailText.email,
          password: passwordText.password,
        }),
      };
      const serverRes = await fetch(url, options);
      const resJsonData = await serverRes.json();

      if (serverRes.status === 200) {
        goToHomePage(resJsonData);
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
    setPasswordText((prevState) => ({
      ...prevState,
      password: "",
      passwordRequiredText: "",
    }));
    setIsLoginButtonActive(false);
  };

  const validateFormData = () => {
    let passwordTest =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,12}$/;
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
    } else if (passwordText.password === "") {
      setPasswordText((prevState) => ({
        ...prevState,
        password: "",
        passwordRequiredText: "Required*",
      }));
    } else if (!passwordTest.test(passwordText.password)) {
      setPasswordText((prevState) => ({
        ...prevState,
        passwordRequiredText: "Invalid password",
      }));
    } else {
      loginTheUser();
    }
  };

  const submitTheForm = (event) => {
    event.preventDefault();

    validateFormData();
  };

  return (
    <div className="login-form-card">
      <div className="login-logo-image-container">
        <p className="login-logo-name">Solar Rotary Packing System</p>
      </div>
      <form className="login-form-element" onSubmit={submitTheForm}>
        <div className="d-flex flex-column justify-content-center mt-1 mb-1">
          <label className="login-label" htmlFor="loginEmail">
            Email
          </label>
          <input
            className="login-input-ele"
            id="loginEmail"
            placeholder="Enter Your Email"
            type="text"
            value={emailText.email}
            onChange={changeTheEmail}
          />
          <p className="login-required-text">{emailText.emailRequiredText}</p>
        </div>
        <div className="d-flex flex-column justify-content-center mt-1 mb-1">
          <label className="login-label" htmlFor="loginPassword">
            Password
          </label>
          <div className="login-input-password-container">
            <input
              className="login-input-password-ele"
              id="loginPassword"
              placeholder="Enter Your Password"
              type={showPassword ? "text" : "password"}
              value={passwordText.password}
              onChange={changeThePassword}
            />
            <button
              className="login-password-eye-icon-button"
              type="button"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
          <p className="login-required-text">
            {passwordText.passwordRequiredText}
          </p>
        </div>
        <div className="login-submit-button-container">
          <button
            className={
              !isLoginButtonActive
                ? "login-submit-button"
                : "login-submit-button login-submit-button-inactive"
            }
            type="submit"
            disabled={isLoginButtonActive}
          >
            Login
          </button>
        </div>
        <p className={`login-required-text ${serverResMsg.messageTextColor}`}>
          {serverResMsg.messageText}
        </p>
      </form>
      <div className="login-already-have-account-container">
        <p className="login-already-have-account-text">
          <Link
            className="login-already-have-account-link"
            to={"/user-mail-collect-srps"}
          >
            Forgot Password
          </Link>
        </p>
      </div>
      <div className="login-already-have-account-container">
        <p className="login-already-have-account-text">
          Don't have an Account?{" "}
          <Link
            className="login-already-have-account-link"
            to={"/user-signup-srps"}
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginCompo;
