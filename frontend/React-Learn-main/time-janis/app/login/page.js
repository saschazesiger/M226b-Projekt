"use client";

import React, { useState } from "react";
import fetchAuth from "@/client-js/fetchAuth";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    if (data.success && data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }
    console.log(data);
  };

  async function handleData(e) {
    e.preventDefault();

    const response = await fetchAuth("https://api-time.tinyweb.net/user/list");
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <form onSubmit={handleData}>

        <button type="submit">Get</button>
      </form>
    </>
  );
};

export default LoginForm;
