import React from 'react';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { useReactiveVar } from '@apollo/client';
import { snackBarAlerts } from '../hooks/snackBarAlerts';
import useSnackBars from '../hooks/useSnackBar';

const SnackbarAlert = () => {
  const alerts = useReactiveVar(snackBarAlerts);
  const { deleteFromAlert } = useSnackBars();

  return (
    <>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open={alert.open}
          autoHideDuration={5000}
          onClose={() => deleteFromAlert(alert.id)}
          TransitionComponent={(props) => <Slide {...props} direction="left" />}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => deleteFromAlert(alert.id)}
            severity={alert.severity || 'info'}
            color={alert.color || 'text'}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default SnackbarAlert;
