import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedrouteProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  allowedRoles?: string[];
  userRole?: string;
  //   redirectPath: string;
};

function ProtectedRoute({
  children,
  isAuthenticated,
  allowedRoles = [],
  userRole,
}: ProtectedrouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole || "")) {
    return <Navigate to="/forbidden" replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
