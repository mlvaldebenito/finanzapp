import React from "react";
import AppRoutes from "./AppRoutes";

import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import theme from "./theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
