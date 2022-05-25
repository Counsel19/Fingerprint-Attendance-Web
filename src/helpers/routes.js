import React from "react";
import { Navigate, useLocation } from "react-router-dom";


export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
  return !user ? children : <Navigate to={loggedInPath} replace />;
}

export function ProtectedRoute({ children, user, authPath, ...rest }) {
  const location = useLocation()

  return user ? children : <Navigate to={authPath} state={{ from: location}} replace />;
}
