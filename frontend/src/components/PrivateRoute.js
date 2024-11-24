import React from 'react';
import { Navigate } from 'react-router-dom';
import useIsLogged from  '../hooks/useIsLogged'; // Import the useIsLogged hook
import useGetUser from '../hooks/useGetUser';

const PrivateRoute = ({ children }) => {
  const user = useGetUser();
  const isLogged = useIsLogged(); // Check if the user is logged in
  if (user && !user.hasBankCredentials) return <Navigate to="/register-credentials" replace />;
  return isLogged ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
