import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CredentialsStep = ({ label, value, onChange, onNext, onBack }) => (
  <>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      {label}
    </Typography>
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      sx={{ mb: 2 }}
    />
    <Button
      variant="contained"
      sx={{ mr: 2 }}
      onClick={onNext}
      disabled={!value}
    >
      Continuar
    </Button>
    <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={onBack}>
      Atrás
    </Button>
  </>
);

export default CredentialsStep;
