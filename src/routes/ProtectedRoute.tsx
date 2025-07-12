// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "@/services/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuth === null) return null; // or a loading spinner
  return isAuth ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
