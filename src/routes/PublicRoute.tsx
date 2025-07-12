import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "@/services/firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const PublicRoute = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuth === null) return null; // or a loading spinner
  return isAuth ? <Navigate to="/events" replace /> : <Outlet />;
};

export default PublicRoute;
