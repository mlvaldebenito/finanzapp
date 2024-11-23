import React from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

const activities = [
  { code: '011101', name: 'Cultivo de Trigo', category: 1, iva: 'SI' },
  { code: '011102', name: 'Cultivo de Maíz', category: 1, iva: 'SI' },
  { code: '011103', name: 'Cultivo de Avena', category: 1, iva: 'SI' },
];
const SelectActivityStep = ({ selectedActivity, onActivitySelect, onNext }) => (
  <>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      ¿En qué trabajas?
    </Typography>
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel id="activity-selector-label">
        Selecciona una actividad
      </InputLabel>
      <Select
        labelId="activity-selector-label"
        value={selectedActivity?.code || ""}
        onChange={onActivitySelect}
      >
        {activities.map((activity) => (
          <MenuItem key={activity.code} value={activity.code}>
            {activity.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Button variant="contained" onClick={onNext} disabled={!selectedActivity}>
      Continuar
    </Button>
  </>
);

export default SelectActivityStep;
