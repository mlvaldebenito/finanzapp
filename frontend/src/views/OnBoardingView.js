import React, { useState } from "react";
import { Box } from "@mui/material";
import WelcomeStep from "../components/onboarding/WelcomeStep";
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
    <Box>
      <Box>
        <Box>
          {step === 0 && (
            <WelcomeStep
              onSelect={(value) => {
                setStartedActivities(value);
                handleNext();
              }}
            />
          )}
          {step === 1 && (
            <SelectActivityStep
              selectedActivity={selectedActivity}
              onActivitySelect={handleActivitySelection}
              onNext={handleNext}
            />
          )}
          {step === 2 && (
            <ConfirmActivityStep
              selectedActivity={selectedActivity}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
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
          {step === 4 && (
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
          {step === 5 && <CompletionStep onReset={handleReset} />}
        </Box>
      </Box>
    </Box>
  );
}

export default OnboardingFlow;
