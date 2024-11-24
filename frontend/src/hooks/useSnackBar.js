import { useCallback } from 'react';
import { snackBarAlerts } from './snackBarAlerts';

const useSnackBars = () => {
  const addAlert = useCallback((
    {
      id,
      color,
      severity,
      message,
    },
  ) => {
    snackBarAlerts([
      { id, color, severity, message, open: true }, ...snackBarAlerts(),
    ]);
  }, []);
  const deleteFromAlert = useCallback((id) => {
    snackBarAlerts(snackBarAlerts().filter((al) => al.id !== id));
  }, []);
  const cleanAlerts = useCallback(() => {
    snackBarAlerts([]);
  }, []);
  return { addAlert, deleteFromAlert, cleanAlerts };
};

export default useSnackBars;