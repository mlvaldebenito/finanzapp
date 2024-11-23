import React from 'react';
import { Navigate } from 'react-router-dom';
import useIsLogged from  '../hooks/useIsLogged'; // Import the useIsLogged hook

const PrivateRoute = ({ children }) => {
  const isLogged = useIsLogged(); // Check if the user is logged in

  return isLogged ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
