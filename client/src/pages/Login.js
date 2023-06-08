import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/authAction";
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
    <div>
      <p>
        <span>Login Email: kiran.gosavi@techprimelab.com</span>
        <br />
        <span>Login Pass: mypass321</span>
      </p>
      <form onSubmit={handleSubmit}>
        <h3>Login to get started</h3>
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
  );
};

export default Login;
