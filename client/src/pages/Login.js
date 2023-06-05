import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/authAction";
const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/login", value);
      loginAction(res.data, dispatch);
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.log(error);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };
  return (
    <div>
      {user && <Navigate to="/" />}
      <form onSubmit={handleSubmit}>
        <h3>Login to get started</h3>
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={value.email}
          required={true}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={value.password}
          required={true}
        />
        <input type="submit" />
      </form>
      {error && <h4 style={{ color: "red" }}>Invalid Credentials</h4>}
    </div>
  );
};

export default Login;
