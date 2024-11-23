import { Button, Typography } from "@mui/material";
import React from "react";

const NoOnboardingStep = ({ onReset }) => (
  <>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      No necesitas Onboarding
    </Typography>
    <Button variant="contained" sx={{ mt: 2 }} onClick={onReset}>
      Finalizar
    </Button>
  </>
);

export default NoOnboardingStep;
