import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedrouteProps = {
  children: React.ReactNode;
  //   redirectPath: string;
};

function ProtectedRoute({ children }: ProtectedrouteProps) {
  const navigate = useNavigate();
  const isAuthenticated = false; // Replace with actual authentication logic
  // const allowedRoles = ["admin", "user"]; // Replace with actual roles logic
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );
  // if (allowedRoles.length > 0 && !allowedRoles.includes(userRole || "")) {
  //   return <Navigate to="/forbidden" replace />;
  // }
  return <>{children}</>;
}

export default ProtectedRoute;
