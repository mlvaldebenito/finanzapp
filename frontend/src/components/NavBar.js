import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import React from "react";
import Title from "./Title";

const NavBar = () => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#202125",
          }}
        >
          <Toolbar>
            <Box>
              <Title size={40} />
            </Box>
            <Stack
              direction="row"
              position="flex-end"
              sx={{
                ml: "auto",
              }}
            ></Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <Toolbar />
    </>
  );
};

export default NavBar;
