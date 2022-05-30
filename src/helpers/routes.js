import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/use-auth-listener";
import { SlidingPebbles } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";

export function IsUserRedirectUser({ loggedInPath, children }) {
  const user = UseAuth();

  if (user?.length === 0) {
    return (
      <SlidingPebbles
        text={"Loading..."}
        bgColor={"#fff"}
        center={true}
        width={"150px"}
        height={"150px"}
      />
    );
  } else {
    return !user ? children : <Navigate to={loggedInPath} replace />;
  }
}
export function IsUserRedirectAdmin({ loggedInPath, children }) {
  const user = UseAuth();
  if (user?.length === 0) {
    return (
      <SlidingPebbles
        text={"Loading..."}
        bgColor={"#fff"}
        center={true}
        width={"150px"}
        height={"150px"}
      />
    );
  } else {
    return !user || !user?.isAdmin ? (
      children
    ) : (
      <Navigate to={loggedInPath} replace />
    );
  }
}

export function ProtectedRouteAdmin({ children, authPath }) {
  const user = UseAuth();

  const location = useLocation();

  if (user?.length === 0) {
    return (
      <SlidingPebbles
        text={"Loading..."}
        bgColor={"#fff"}
        center={true}
        width={"150px"}
        height={"150px"}
      />
    );
  } else {
    return user?.isAdmin === true ? (
      children
    ) : (
      <Navigate to={authPath} state={{ from: location }} replace />
    );
  }
}

export function ProtectedRouteUser({ children, authPath }) {
  const user = UseAuth();

  const location = useLocation();

  if (user?.length === 0) {
    return (
      <SlidingPebbles
        text={"Loading..."}
        bgColor={"#fff"}
        center={true}
        width={"150px"}
        height={"150px"}
      />
    );
  } else {
    return user ? (
      children
    ) : (
      <Navigate to={authPath} state={{ from: location }} replace />
    );
  }
}
