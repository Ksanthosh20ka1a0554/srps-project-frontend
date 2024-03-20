import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import SignupPage from "./pages/signupPage/SignupPage";
import SignupVerifyPage from "./pages/signupVerifyPage";
import LoginPage from "./pages/loginPage";
import UserMailCollectPage from "./pages/userMailCollectPage";
import PasswordResetPage from "./pages/userPasswordReset";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route exact path="/user-signup-srps" element={<SignupPage />} />
      <Route
        exact
        path="/user-mail-verify-srps/:token"
        element={<SignupVerifyPage />}
      />
      <Route exact path="/login-user-srps" element={<LoginPage />} />
      <Route
        exact
        path="/user-mail-collect-srps"
        element={<UserMailCollectPage />}
      />
      <Route
        exact
        path="/user-password-reset-srps/:token"
        element={<PasswordResetPage />}
      />
      <Route element={<ProtectedRoute />}>
        <Route exact path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
