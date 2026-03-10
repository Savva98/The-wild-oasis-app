import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedrouteProps = {
  children: React.ReactNode;
  userInfo?: { role: string };
};
function ProtectedRoute({ children, userInfo }: ProtectedrouteProps) {
  const navigate = useNavigate();
  const isAuthenticated = false; // Replace with actual authentication logic
  const allowedRoles = ["admin"]; // Replace with actual roles logic
  const userRole = userInfo?.role;
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      }
    },
    [isAuthenticated, navigate],
  );
  // if (allowedRoles.length > 0 && !allowedRoles.includes(userRole || "")) {
  //   navigate("/forbidden", { replace: true });
  //   return null;
  // }
  return <>{children}</>;
}

export default ProtectedRoute;
