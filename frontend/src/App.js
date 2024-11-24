import React from 'react';
import AppRoutes from './AppRoutes';

import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import SnackbarAlert from './components/SnackBarAlert';

function App() {
  return (
    <>
    <SnackbarAlert />
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
    </>
  );
}

export default App;
