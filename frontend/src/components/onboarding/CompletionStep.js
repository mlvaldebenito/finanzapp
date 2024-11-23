import { Button, Typography } from "@mui/material";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";

const CompletionStep = ({ onReset }) => (
  <>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      ¡Onboarding Completado!
    </Typography>
    <Typography>Ahora puedes acceder a la pantalla principal.</Typography>
    <Button
      variant="contained"
      startIcon={<DoneIcon />}
      sx={{ mt: 2 }}
      onClick={onReset}
    >
      Finalizar
    </Button>
  </>
);

export default CompletionStep;
