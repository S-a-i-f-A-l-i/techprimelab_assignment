import React, { useState, useEffect } from "react";
import FormRow from "../components/FormRow";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userData;
    console.log("email", email, "password", password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login to get started</h1>
        <FormRow
          type="email"
          name="email"
          value={userData.email}
          handleChange={handleChange}
          required={true}
        />
        <FormRow
          type="password"
          name="password"
          value={userData.password}
          handleChange={handleChange}
          required={true}
        />
        <span>Forgot password</span>
        <br />
        <button type="Login">Login</button>
      </form>
    </div>
  );
};

export default Login;
