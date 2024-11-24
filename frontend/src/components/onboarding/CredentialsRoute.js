import React from 'react';
import { Navigate } from 'react-router-dom';
import useGetUser from '../../hooks/useGetUser';

const CredentialsRoute = ({ children }) => {
  const user = useGetUser(); // Check if the user is logged in
  return user?.hasBankCredentials ? <Navigate to="/main" replace /> : children ;
};

export default CredentialsRoute;
