import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/authAction";
import styles from "../assets/styles/Login.module.css";
import loginBg from "../assets/images/login-bg-1.svg";
import logo from "../assets/images/Logo.svg";
const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
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
      const res = await axios.post(
        "https://techprimelab-assignment-lmk9.onrender.com/auth/login",
        value
      );
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
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      navigate("/");
    }
  }, []);
  return (
    <div className={styles.container}>
      <img src={loginBg} alt="background" />
      <div>
        <img src={logo} alt="logo" />
        <h4>Online Project Management</h4>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login to get started</h2>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={value.email}
            required={true}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={value.password}
            required={true}
          />
          <br />
          <input type="submit" />
        </form>
        {error && <h4 style={{ color: "red" }}>Invalid Credentials</h4>}
      </div>
    </div>
  );
};

export default Login;
