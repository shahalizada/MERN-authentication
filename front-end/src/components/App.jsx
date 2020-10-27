import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import userContext from "./Context/userContext";
import Header from "./layout/Header";
import Home from "./pages/Home";
import Login from "./auth/login";
import Register from "./auth/register";

import "./styles.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const loggedInUser = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/user/validToken",
        null,
        { headers: { "user-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/user/", {
          headers: { "user-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    loggedInUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <userContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </userContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
