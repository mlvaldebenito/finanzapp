import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ConfirmActivityStep = ({ selectedActivity, onNext, onBack }) => (
  <>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      Confirma tu Actividad
    </Typography>
    {selectedActivity && (
      <Box sx={{ mb: 4 }}>
        <Typography>
          <strong>Actividad:</strong> {selectedActivity.name}
        </Typography>
        <Typography>
          <strong>Categoría:</strong> {selectedActivity.category}
        </Typography>
        <Typography>
          <strong>¿Afecta IVA?:</strong>{" "}
          {selectedActivity.iva === "SI" ? "Sí" : "No"}
        </Typography>
      </Box>
    )}
    <Button variant="contained" sx={{ mr: 2 }} onClick={onNext}>
      Confirmar
    </Button>
    <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBack}>
      Cambiar
    </Button>
  </>
);

export default ConfirmActivityStep;
