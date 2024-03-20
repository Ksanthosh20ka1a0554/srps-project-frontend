import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();

  const logoutFromApp = () => {
    Cookies.remove("srps-login-token");

    navigate("/login-user-srps", { replace: true });
  };

  return (
    <header className="header-main-container">
      <NavLink
        className="header-web-name-link"
        role="navigation"
        aria-label="website name"
      >
        Solar Rotary Packing System
      </NavLink>
      <nav className="d-flex align-items-center ms-1">
        <ul className="header-list-container">
          <li>
            <NavLink className="header-list-link">Home</NavLink>
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-danger"
          onClick={logoutFromApp}
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
