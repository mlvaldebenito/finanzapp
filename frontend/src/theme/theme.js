import { createTheme } from '@mui/material';

const theme = createTheme({
  mode: 'light', // o 'dark'
  palette: {
    primary: {
      main: '#1976d2', // A clean blue for primary actions
      dark: '#004ba0', // A darker blue for hover states
    },
    background: {
      default: '#ffffff', // Light gray background for the main app
      paper: '#ffffff', // Another light gray background for the paper component
    },
    text: {
      primary: '#212121', // Dark gray for text
      secondary: '#ffffff', // Lighter gray for secondary text
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#212121', // Matches the primary text color
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#212121', // Matches the primary text color
    },
    button: {
      textTransform: 'none', // Disable uppercase styling for buttons
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', 
          textTransform: 'none', 
          background: 'linear-gradient(145deg, #e3f2fd, #bbdefb)', // Light blue gradient for buttons
          color: '#1976d2', 
          '&:hover': {
            background: 'linear-gradient(145deg, #bbdefb, #e3f2fd)', // Inverted hover gradient
          },
        },
      },
    },
  },
});

export default theme;
