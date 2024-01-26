"use client";

import React, { useState } from "react";
import fetchAuth from "@/client-js/fetchAuth";
import BeatLoader from "react-spinners/ClipLoader";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("https://api-time.tinyweb.net/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    setLoading(false);

    if (data.success && data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      props.setLogin("loggedin");
    } else {
      setWarning(data.error);
    }
  };

  return (
    <>
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
        <button type="submit" className="btn btn__primary">{loading === false ?("Login"):(<BeatLoader color="#ffffff" />)}</button>
        
        <br />
        <p>{warning}</p>
      </form>
      
    </>
  );
};

export default LoginForm;
