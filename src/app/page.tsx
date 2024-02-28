"use client";

import React, { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTos, setAgreeTos] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleCheckboxChange = () => {
    setAgreeTos(!agreeTos);
  };

  const handleLogin = async () => {
    setLoading(true); // Set loading state to true

    // different fetch url for dev and prod
    // const response = await fetch("/get_data/api", { // prod
    const response = await fetch("/get_data_dev/api", { // dev
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      window.location.href = "/dashboard";
    } else {
      console.log("Login failed");
    }

    setLoading(false); // Set loading state to false after API response
  };

  return (
    <main className="loginPage">
      {loading ? ( // Conditionally render loading screen
        <div className="loading-screen">Loading...</div>
      ) : (
        <div className="login-box" onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <div className="loginSplash">
            Welcome to the beta of Enipsa!
            <br />
            This is actively being worked on,
            <br />
            check out the <a href="https://github.com/enipsa/aspine2">repository on our github</a>!
            <br />
            <br />
          </div>
          {/* <div className="inline-display-div">
          <p>I agree to the TOS:</p>
          <input
            type="checkbox"
            name="tosAgree"
            checked={agreeTos}
            onChange={handleCheckboxChange}
            required
          />
          </div> */}
          <button className="loginSubmissionButton" type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </main>
  );
}