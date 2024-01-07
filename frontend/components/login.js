"use client";

import React, { useState } from "react";
import fetchAuth from "@/client-js/fetchAuth";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("https://api-time.tinyweb.net/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log(data);
    if (data.success && data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      props.getLogin("loggedin");
    } else {
      setWarning(data.error);
    }
  };

  return (
    <>
    <div></div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            placeholder="Username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form__input"
          />
        </div>
        <br />
        <div>
          <input
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form__input"
          />
        </div>
        <br />
        <button type="submit" className="btn btn__primary">Login</button>
        <br />
        <p>{warning}</p>
      </form>
      
    </>
  );
};

export default LoginForm;
