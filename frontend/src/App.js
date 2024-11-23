import React from 'react';
import AppRoutes from './AppRoutes';

import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  );
}

export default App;
