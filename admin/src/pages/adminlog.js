import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

export const Adminlog = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate username and password
    if (username === "saisriram" && password === "admin@123") {
      // Navigate to the show page
      navigate("/show");
    } else {
      // Display an alert if credentials don't match  
      alert("Username or password incorrect");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <form className="text-center" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="container">
          <label htmlFor="uname">
            <b>Username :</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="psw">
            <b>Password :</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button style={{ marginLeft: "75px" }} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
