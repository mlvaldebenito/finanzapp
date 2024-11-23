import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';

const MyNewView = () => {
  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh', 
        textAlign: 'center', 
        backgroundColor: '#206f98',
        px: 3
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography 
          color='#ffffff' 
          variant="h1" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '3rem', sm: '4rem', md: '6rem' } // Responsive font size
          }}
        >
          Hackathon
        </Typography>
        <Typography 
          color='#ffffff' 
          variant="h5" 
          sx={{ 
            mt: 3,
            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '2rem' } // Responsive font size for subtitle
          }}
        >
          Coming Soon...
        </Typography>
        <Button 
        variant="contained" 
        sx={{ mt: 2, backgroundColor: '#ffffff', color: '#206f98',
        '&:hover': {
          backgroundColor: '#ffffff',
          color: '#206f98'
        }
         }}
        onClick={() => {}}
      >
        Conoce nuestra app
      </Button>
      </Box>
    </Container>
  );
};

export default MyNewView;
