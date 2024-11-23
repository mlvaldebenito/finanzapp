import React, { useState } from "react";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import WelcomeStep from "../components/onboarding/WelcomeStep";
import NoOnboardingStep from "../components/onboarding/NoOnboardingStep";
import SelectActivityStep from "../components/onboarding/SelectActivityStep";
import ConfirmActivityStep from "../components/onboarding/ConfirmActivityStep";
import CredentialsStep from "../components/onboarding/CredentialsStep";
import CompletionStep from "../components/onboarding/CompletionStep";

const activities = [
  { code: "011101", name: "Cultivo de Trigo", category: 1, iva: "SI" },
  { code: "011102", name: "Cultivo de Maíz", category: 1, iva: "SI" },
  { code: "011103", name: "Cultivo de Avena", category: 1, iva: "SI" },
];

function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [startedActivities, setStartedActivities] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [credentials, setCredentials] = useState({ sii: "", bank: "" });

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleReset = () => {
    setStep(0);
    setStartedActivities(null);
    setSelectedActivity(null);
    setCredentials({ sii: "", bank: "" });
  };

  const handleActivitySelection = (event) => {
    const selected = activities.find(
      (activity) => activity.code === event.target.value
    );
    setSelectedActivity(selected || null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          mx: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          {step === 0 && (
            <WelcomeStep
              onSelect={(value) => {
                setStartedActivities(value);
                handleNext();
              }}
            />
          )}
          {step === 1 &&
            (startedActivities ? (
              <NoOnboardingStep onReset={handleReset} />
            ) : (
              <>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Comencemos tu Onboarding
                </Typography>
                <Button variant="contained" onClick={handleNext}>
                  Continuar
                </Button>
              </>
            ))}
          {step === 2 && (
            <SelectActivityStep
              selectedActivity={selectedActivity}
              onActivitySelect={handleActivitySelection}
              onNext={handleNext}
            />
          )}
          {step === 3 && (
            <ConfirmActivityStep
              selectedActivity={selectedActivity}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 4 && (
            <CredentialsStep
              label="Usuario SII"
              value={credentials.sii}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, sii: e.target.value }))
              }
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 5 && (
            <CredentialsStep
              label="Usuario del Banco"
              value={credentials.bank}
              onChange={(e) =>
                setCredentials((prev) => ({ ...prev, bank: e.target.value }))
              }
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 6 && <CompletionStep onReset={handleReset} />}
        </CardContent>
      </Card>
    </Box>
  );
}

export default OnboardingFlow;
