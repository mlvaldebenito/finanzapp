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
  if (!refreshTokenVar()) return null;
  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      sx={{
        padding: '10px 24px',
        background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
        color: '#fff',
        borderRadius: '12px',
        fontSize: '0.875rem',
        fontWeight: 600,
        textTransform: 'none',
        marginLeft: 'auto',
        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          background: 'linear-gradient(45deg, #115293, #1976d2)',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
        }
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
