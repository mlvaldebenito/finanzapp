import { Box, Typography, Stack } from "@mui/material";
import React from "react";
import Colega from "../assets/colega.png";

const Title = ({ size = 50 }) => (
  <Stack
    direction="row"
    alignItems="center"
    sx={{
      height: "100%",
    }}
  >
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundImage: `url(${Colega})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: size,
        height: size,
        fontFamily: "Proxima Nova Condensed, sans-serif",
      }}
    />
    <Typography
      sx={{
        fontWeight: "700",
        fontSize: `${size / 1.3}px`,
        textAlign: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontFamily: "Proxima Nova Condensed, sans-serif",
        ml: 1,
        mr: 0,
      }}
      variant="h1"
      color={"#fff"}
    >
      Cole
      <Box
        component="span"
        sx={{
          color: "primary.main",
        }}
      >
        ga
      </Box>
    </Typography>
  </Stack>
);

export default Title;