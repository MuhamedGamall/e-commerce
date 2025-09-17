// ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const ProtectedRoute =({ children }: { children }) => {
    let isAuth = false;
    const token = localStorage.getItem("token");
      if (token) {
        const user: any = jwtDecode(token);
        if (user && user.exp && user?.exp * 1000 <= Date.now()) {
          localStorage.removeItem("token");
        }
        else
        isAuth = true;
    }


  return isAuth  ?  children : <Navigate to="/en/login" replace />;
};

export default ProtectedRoute;