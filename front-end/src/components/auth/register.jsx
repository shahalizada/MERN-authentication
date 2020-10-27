import React, { useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/userContext";
import ErrorNotice from "../Errors/errorNotice";

export default function Register() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [errors, setErrors] = useState();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { name, username, password, password2 };
      await Axios.post("http://localhost:5000/user/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/user/login", {
        username,
        password,
      });
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
      <h1>Register your Account</h1>
      <h1>Hello {name}</h1>
      {
        <ErrorNotice
          errorMsg={errors}
          clearError={() => setErrors(undefined)}
        />
      }
      <form onSubmit={submit}>
        <input
          name="name"
          type="text"
          placeholder="Your name..."
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />

        <input
          name="email"
          type="email"
          placeholder="Your email..."
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          placeholder="Your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          name="password2"
          type="password"
          placeholder="Confirm Password..."
          onChange={(e) => setPassword2(e.target.value)}
        />

        <input className="button" type="submit" value="Register" />
      </form>
    </div>
  );
}
