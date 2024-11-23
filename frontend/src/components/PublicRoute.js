import React from 'react';
import { Navigate } from 'react-router-dom';
import useIsLogged from '../hooks/useIsLogged'; // Import your authentication hook

const PublicRoute = ({ children }) => {
  const isLogged = useIsLogged(); // Check if the user is logged in

  return isLogged ? <Navigate to="/main" replace /> : children;
};

export default PublicRoute;