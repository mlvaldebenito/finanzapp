import React from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshTokenVar } from '../graphql/reactive';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('refreshToken'); 
    refreshTokenVar(null); 
    navigate('/login', { replace: true });
  };

  return (
    <Button
      onClick={handleLogout}
      style={{
        padding: '10px 20px',
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        size: 'small',
        marginLeft: 'auto',
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
