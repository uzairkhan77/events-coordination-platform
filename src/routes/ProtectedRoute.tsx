// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = (): boolean => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  return Boolean(token);
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
