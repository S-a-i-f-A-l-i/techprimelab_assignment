import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginAction } from "../redux/actions/authAction";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const token = JSON.parse(localStorage.getItem("token")) || null;
  if (user && token) {
    loginAction({ user, token }, dispatch);
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
