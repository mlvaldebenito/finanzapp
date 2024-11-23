import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNewView from './views/MyNewView';
import MainView from './views/MainView';
import OnBoardingView from './views/OnBoardingView';
import Login from './views/Login';
import PrivateRoute from './components/PrivateRoute'; // Protect routes
import PublicRoute from './components/PublicRoute'; // Redirect logged-in users
import RegisterCredentials from './views/RegisterCredentials';

import {  ApolloProvider } from '@apollo/client';
import client from './apollo/client';

function App() {
  console.log('REACT_APP_GRAPHQL_URI', process.env.REACT_APP_BACKEND_URI);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<MyNewView />} />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <MainView />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/onboarding" element={<OnBoardingView />} />
          <Route path='/register-credentials' element={<RegisterCredentials />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
