import React from 'react';
import { Box } from '@mui/material';

const TermometerLoader = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '32rem',
        mx: 'auto',
        height: '16px',
        bgcolor: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '9999px',
        overflow: 'hidden',
        mt: 2
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #10b981, #3b82f6)',
          animation: 'loader 2s infinite',
          '@keyframes loader': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' }
          }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #10b981, #3b82f6)',
          animation: 'loader 2s infinite 1s',
          '@keyframes loader-delayed': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' }
          }
        }}
      />
    </Box>
  );
};

export default TermometerLoader;
