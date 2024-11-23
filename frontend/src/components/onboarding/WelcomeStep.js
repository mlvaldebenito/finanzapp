import { Button, Typography } from "@mui/material";
import React from "react";

const WelcomeStep = ({ onSelect }) => (
  <>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      Bienvenido/a
    </Typography>
    <Typography sx={{ mb: 4 }}>
      ¿Ya iniciaste actividades económicas?
    </Typography>
    <Button variant="contained" sx={{ mr: 2 }} onClick={() => onSelect(true)}>
      Sí
    </Button>
    <Button variant="outlined" onClick={() => onSelect(false)}>
      No
    </Button>
  </>
);

export default WelcomeStep;
