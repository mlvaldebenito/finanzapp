import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Box, Container, Typography, TextField, IconButton } from '@mui/material';

const ChatInterface = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission
      setMessage('');
    }
  };

  return (
    <Box 
      component="section"
      sx={{
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "16px",
        background: "linear-gradient(145deg, #3b82f6, #e2e8f0)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
        margin: 0,
        "& .MuiGrid-item": {
        pt: { xs: "2", md: "0 !important" },
        },
      }}
    >
      <Container sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
            ¿Quieres iniciar actividades en el SII?
          </Typography>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 500 }}>
            Cuentanos un poco sobre que actividades realizas y te guiamos con el proceso.
          </Typography>
        </Box>
        <Box sx={{ maxWidth: '2xl', mx: 'auto' }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ejemplo: Corto el pelo en la peluqueria de mi barrio"
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  borderRadius: '12px',
                  border: '1px solid white',
                  fontSize: '1.2rem',
                  '&:hover, &.Mui-focused': {
                    border: 'none',
                    outline: '2px solid white'
                  }
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'white',
                  fontSize: '1.2rem'
                }
              }}
            />
            <IconButton
              type="submit"
              sx={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'grey.400',
                '&:hover': {
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.15)'
                }
              }}
            >
              <Send sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ChatInterface;