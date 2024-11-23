import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import GrainIcon from "@mui/icons-material/Grain";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const activities = [
  { code: "011101", name: "Cultivo de Trigo", category: 1, iva: "SI" },
  { code: "011102", name: "Cultivo de Maíz", category: 1, iva: "SI" },
  { code: "011103", name: "Cultivo de Avena", category: 1, iva: "SI" },
];

export default function ActivitySelector({ selectedActivity, onActivitySelect, onNext }) {



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #f3f4f6, #e0e7ff)",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 600, width: "100%", p: 4 }}>
        <CardHeader
          sx={{
            textAlign: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: "50%",
                backgroundColor: "rgba(63, 81, 181, 0.1)",
              }}
            >
              <BusinessIcon
                sx={{ fontSize: 36, color: "primary.main" }}
              />
            </Box>
          </Box>
          <Typography variant="h4" fontWeight="bold">
            ¿En qué trabajas?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Selecciona tu actividad principal para personalizar tu experiencia
          </Typography>
        </CardHeader>

        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="activity-select-label">Selecciona una actividad</InputLabel>
            <Select
              labelId="activity-select-label"
              value={selectedActivity?.code || ""}
              onChange={(e) => onActivitySelect(e)}
              sx={{
                mb: 3,
              }}
              aria-labelledby="activity-select-label"
            >
              {activities.map((activity) => (
                <MenuItem key={activity.code} value={activity.code}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <GrainIcon color="primary" />
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {activity.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Código: {activity.code}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedActivity && (
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "rgba(33, 150, 243, 0.1)",
                mb: 3,
              }}
            >
              <Typography variant="body1" fontWeight="medium">
                Actividad seleccionada:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedActivity.name} (Categoría: {selectedActivity.category})
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={!selectedActivity}
            onClick={onNext}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              fontWeight: "bold",
              height: 56,
            }}
          >
            Continuar
            <ArrowForwardIosOutlinedIcon fontSize="small" />
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

ActivitySelector.propTypes = {
  onActivitySelect: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};
