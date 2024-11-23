import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Email,
  Lock,
  Person,
  PersonAdd,
} from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations'; // Adjust the path to your mutation

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Login = () => {
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [registerUser] = useMutation(REGISTER_USER);

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tab === 1 && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      if (tab === 1) {
        // Register a new user
        const { data } = await registerUser({
          variables: { email, password },
        });
        alert(`Account created for ${data.registerUser.user.email}`);
      } else {
        // Handle login logic here
        alert('Logged in successfully!');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred!');
    } finally {
      setIsLoading(false);
    }
  };

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
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                py: 2,
              },
            }}
          >
            <Tab
              icon={<Person sx={{ mr: 1 }} />}
              label="Iniciar Sesión"
              iconPosition="start"
            />
            <Tab
              icon={<PersonAdd sx={{ mr: 1 }} />}
              label="Registrarse"
              iconPosition="start"
            />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
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
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Person sx={{ mr: 1 }} />
                      Iniciar Sesión
                    </>
                  )}
                </Button>
              </Box>
            </form>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
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
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Confirmar Contraseña"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
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
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={24} sx={{ mr: 1 }} color="inherit" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <PersonAdd sx={{ mr: 1 }} />
                      Crear Cuenta
                    </>
                  )}
                </Button>
              </Box>
            </form>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
