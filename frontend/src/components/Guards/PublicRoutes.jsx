import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const PublicRoutes = () => {
  const userIsVerified = useSelector((state) => state.auth?.user?.verified);

  return userIsVerified ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default PublicRoutes;
