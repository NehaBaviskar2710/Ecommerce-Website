import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// public protect routes
function PublicProtectedRoutes() {

  return localStorage.getItem("jwt") ? <Outlet /> : <Navigate to="/login" />;
}

// admin protect routes
function AdminProtectedRoutes() {
  const { auth } = useSelector((store) => store);
  console.log("Role sang : ", auth?.user?.role);
  return localStorage.getItem("jwt") ? (
    auth?.user?.role === "ROLE_ADMIN" ? (
        <Outlet />
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/login" />
  );
}
export { PublicProtectedRoutes, AdminProtectedRoutes };