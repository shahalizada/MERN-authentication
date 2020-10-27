import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../Context/userContext";
export default function Options() {
  const { userData, setUserData } = useContext(userContext);
  const histroy = useHistory();

  function Register() {
    histroy.push("/register");
  }
  function Login() {
    histroy.push("/login");
  }
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <nav className="header-options">
      {userData.user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <button onClick={Register}>Register</button>
          <button onClick={Login}>Login</button>
        </>
      )}
    </nav>
  );
}
