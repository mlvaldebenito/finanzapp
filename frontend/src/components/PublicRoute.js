import React from 'react';
import { Navigate } from 'react-router-dom';
import useIsLogged from '../hooks/useIsLogged'; // Import your authentication hook
import useGetUser from '../hooks/useGetUser';

const PublicRoute = ({ children }) => {
  const isLogged = useIsLogged(); // Check if the user is logged in
  const user = useGetUser()
  if (!isLogged) return children;
  if (user && !user.hasBankCredentials) return <Navigate to="/register-credentials" replace />;
  return <Navigate to="/main" replace />;
};

export default PublicRoute;