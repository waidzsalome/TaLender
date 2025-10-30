// ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { requestIsMe } from "../service/api";
import Loading from "./Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
      const { data } = await requestIsMe();
      console.log(data);
      setIsAuth(true);
    } catch (error) {
      console.log("checkAuthfailed", error);
      setIsAuth(true);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  if (isAuth === null) {
    return <Loading />;
  }
  if (!isAuth) return <Navigate to="/loginrequired" />;
  return <>{children}</>;
};

export default ProtectedRoute;
