import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import "./index.css";

const ErrorFallbackPage = ({ error }) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="signup-error-fallback-main-container">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="signup-error-fallback-icon-container">
          <img
            src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png"
            alt="errorIcon"
            className="signup-error-fallback-icon"
          />
        </div>
        <h3 className="signup-error-fallback-head">
          Oops! Something Went Wrong. Try Again.
        </h3>
        <p className="signup-error-fallback-text">Your Payment Failed</p>
        <button className="btn btn-primary mt-2" onClick={resetBoundary}>
          Reload
        </button>
      </div>
    </div>
  );
};

export default ErrorFallbackPage;
