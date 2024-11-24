import React from "react";
import AppRoutes from "./AppRoutes";

import client from "./apollo/client";
import theme from "./theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import SnackbarAlert from "./components/SnackBarAlert";
import NavBar from "./components/NavBar";
import { Container } from "@mui/material";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <SnackbarAlert />
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container variant="body" maxWidth={true} sx={{
            padding: 0,
            margin: 0,
          }} >
            <NavBar />
            <AppRoutes />
          </Container>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
