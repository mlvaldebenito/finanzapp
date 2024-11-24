import React from "react";
import AppRoutes from "./AppRoutes";

import client from "./apollo/client";
import theme from "./theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ApolloProvider } from '@apollo/client';
import SnackbarAlert from './components/SnackBarAlert';

function App() {
  return (
    <>
    <SnackbarAlert />
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </ApolloProvider>
    </>
  );
}

export default App;
