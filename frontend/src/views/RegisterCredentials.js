import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Typography,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  AccountBalance,
  Lock,
  Person,
} from '@mui/icons-material';
import { prettifyRut, removeSeparators } from 'react-rut-formatter';

const RegisterCredentials = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [rut, setRut] = useState({ formatted: '', raw: '' });
  const [password, setPassword] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleRutChange = (
    (e) => {
      const newRut = e.target.value;
      const cleanedRut = removeSeparators(newRut);
      const formattedRut = prettifyRut(cleanedRut);
      const displayRut = formattedRut !== '0-0' ? formattedRut : '';
      setRut({ formatted: displayRut, raw: cleanedRut });
    });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(145deg, #f1f5f9, #e2e8f0)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ p: 3 }}>
            <Stack direction="column" spacing={2}>
            <Typography variant="h5" component="h1" align="center" gutterBottom sx={{ mb: 3 }}>
              <AccountBalance sx={{ mr: 1, verticalAlign: 'middle' }} />
              Registra tu Cuenta Bancaria
            </Typography>
            <Stack direction="row" spacing={1} alignSelf="center">
            <Chip
                label="Banco Santander"
                color="error"
                clickable
                />
                <Tooltip title="Próximamente">
                <Chip
                label="Banco Estado"
                clickable={false}
                />
                </Tooltip>
                <Tooltip title="Próximamente">
                <Chip
                label="Banco de Chile"
                clickable={false}
                />
                </Tooltip>
            </Stack>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  required
                  fullWidth
                  label="Rut"
                  value={rut.formatted}
                  onChange={handleRutChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 8 }
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 8 }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    mt: 1,
                    py: 1.5,
                    background: 'linear-gradient(145deg, #2196f3, #1976d2)',
                    '&:hover': {
                      background: 'linear-gradient(145deg, #1976d2, #1565c0)',
                    },
                    borderRadius: 8,
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <AccountBalance sx={{ mr: 1 }} />
                      Registrar Cuenta
                    </>
                  )}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterCredentials;