import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import SparklesOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

export default function WelcomeScreen({ onSelect }) {
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
      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          p: 4,
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        {/* Background gradient */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: "linear-gradient(to bottom right, rgba(63, 81, 181, 0.1), rgba(30, 136, 229, 0.1))",
            borderRadius: "inherit",
          }}
        />
        
        <CardContent sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Title and Description */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(to right, #3f51b5, #1e88e5)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 2,
            }}
          >
            ¡Bienvenido/a!
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              justifyContent: "center",
              pt: 2,
            }}
          >
            {/* Option 1: Yes */}
            <Button
              variant="contained"
              size="large"
              startIcon={<RocketLaunchOutlinedIcon />}
              sx={{
                py: 2,
                px: 4,
                minWidth: 200,
                fontWeight: "bold",
                backgroundColor: "#4caf50",
                "&:hover": {
                  backgroundColor: "#43a047",
                },
              }}
              onClick={() => onSelect(true)}
            >
              Sí, ya inicié
            </Button>

            {/* Option 2: No */}
            <Button
              variant="outlined"
              size="large"
              startIcon={<SparklesOutlinedIcon />}
              sx={{
                py: 2,
                px: 4,
                minWidth: 200,
                fontWeight: "bold",
                borderColor: "#1e88e5",
                color: "#1e88e5",
                "&:hover": {
                  backgroundColor: "rgba(30, 136, 229, 0.1)",
                },
              }}
              onClick={() => onSelect(false)}
            >
              No, aún no
            </Button>
          </Box>
        </CardContent>

        {/* Footer */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            pt: 3,
            mt: 2,
            color: "text.secondary",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <ArrowForwardIosOutlinedIcon fontSize="small" />
            Selecciona una opción para continuar
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
