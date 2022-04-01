import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children, isLogged }) {
  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  return children;
}
