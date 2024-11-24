import React from 'react';
import { Navigate } from 'react-router-dom';
import useGetUser from '../hooks/useGetUser';
import useIsLogged from '../hooks/useIsLogged';

const CredentialRoute = ({ children }) => {
    const isLogged = useIsLogged();
    const user = useGetUser();
    if (!isLogged) return <Navigate to="/login" replace />
    if (user && user.hasBankCredentials) return <Navigate to="/main" replace />;
    return children;
};

export default CredentialRoute;
