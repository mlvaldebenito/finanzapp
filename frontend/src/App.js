import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNewView from './views/MyNewView';
import MainView from './views/MainView';
import OnBoardingView from './views/OnBoardingView';
import Login from './views/Login';
import PrivateRoute from './components/PrivateRoute'; // Protect routes
import PublicRoute from './components/PublicRoute'; // Redirect logged-in users
import RegisterCredentials from './views/RegisterCredentials';
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
