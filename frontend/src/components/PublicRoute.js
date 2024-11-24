import React from 'react';
import { Navigate } from 'react-router-dom';
import useIsLogged from '../hooks/useIsLogged'; // Import your authentication hook
import useGetUser from '../hooks/useGetUser';

const PublicRoute = ({ children }) => {
  const isLogged = useIsLogged(); // Check if the user is logged in
  const user = useGetUser();
  console.log(user)

  return isLogged ? <Navigate to="/main" replace /> : children;
};

export default PublicRoute;