import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Box, Button, Container, Typography, TextField, IconButton, Stack } from '@mui/material';
import TermometerLoader from './termometerLoader';
import {ActivityInitiationGuidance} from './activityInitationGuidance';
import { useMutation } from '@apollo/client';
import { ASK_ACTIVITY_GUIDANCE } from '../graphql/mutations';

const ACTIVITY_TYPE_MAPPER = {
  '1': 'basicFeeBillActivity',
  '2': 'companyFeeBillActivity',
  'G': 'uncertainActivity'
};


const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [statement, setStatement] = useState(true);
  const [showNextStep, setShowNextStep] = useState(false);
  const [activityDetails, setActivityDetails] = useState({ activity: '', ivaCode: '1' });

  
  const [askActivityGuidance, { loading: askActivityGuidanceLoading }] = useMutation(ASK_ACTIVITY_GUIDANCE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatement(false);
      const { data } = await askActivityGuidance({
        variables: { activityDescription: message }
      });
      setActivityDetails({
        activity: data.askActivityGuidance.activity,
        ivaCode: data.askActivityGuidance.ivaCode
      });
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleConfirmActivity = () => {
    setShowNextStep(true);
  };

  return (
    statement ? (
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
          background: "linear-gradient(145deg, #3b82f6, #93c5fd)",
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
                  color: 'white',
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
    ) : 
    <Box 
      sx={{
        height: '80vh',
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "16px",
        background: "linear-gradient(145deg, #3b82f6, #93c5fd)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
        margin: 0,
        "& .MuiGrid-item": {
        pt: { xs: "2", md: "0 !important" },}
    }}>
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {askActivityGuidanceLoading ? (
          <Box>
            <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', fontWeight: 550, py: 1 }}>
              Estamos revisando la tributación de tu rubro...
            </Typography>
            <TermometerLoader />
          </Box>
        ) : (
          showNextStep ? (
            <ActivityInitiationGuidance activityType={ACTIVITY_TYPE_MAPPER[activityDetails.ivaCode]} />
          ) : (
            <Stack spacing={4}>
                <Typography variant="h4" sx={{ color: 'white', textAlign: 'center', fontWeight: 550, py: 1 }}>
                    ¿Es esta tu actividad económica?
                </Typography>
                <Typography variant="h5" sx={{ color: 'white', textAlign: 'center', fontWeight: 500, py: 1 }}>
                    {activityDetails.activity}
                </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleConfirmActivity}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  borderRadius: '12px',
                  bgcolor: '#10b981',
                  '&:hover': {
                    bgcolor: '#059669'
                  },
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                Confirmar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setStatement(true)}
                sx={{
                  px: 4, 
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  borderRadius: '12px',
                  bgcolor: '#ef4444',
                  '&:hover': {
                    bgcolor: '#dc2626'
                  },
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              >
                Volver a buscar
              </Button>
            </Box>
        </Stack>
        )
      )}
      </Box>
    </Box>
  );
}

export default ChatInterface;