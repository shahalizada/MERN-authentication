import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../Context/userContext";
import ErrorNotice from "../Errors/errorNotice";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [errors, setErrors] = useState();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = { username, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/user/login",
        loggedUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setErrors(err.response.data.msg);
    }
  };
  return (
    <div className="container">
      <h1>Login with your account!</h1>
      {
        <ErrorNotice
          errorMsg={errors}
          clearError={() => setErrors(undefined)}
        />
      }
      <form onSubmit={submitLogin}>
        <input
          type="email"
          placeholder="Your email..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="button" type="submit" value="Login" />
      </form>
    </div>
  );
}
