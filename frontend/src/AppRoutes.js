import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainView from './views/MainView';
import OnBoardingView from './views/OnBoardingView';
import Login from './views/Login';
import PrivateRoute from './components/PrivateRoute'; // Protect routes
import PublicRoute from './components/PublicRoute'; // Redirect logged-in users
import RegisterCredentials from './views/RegisterCredentials';
import CredentialRoute from './components/CredentialsRoute';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
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

          {/* Protected Routes */}
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <MainView />
              </PrivateRoute>
            }
          />
          <Route
            path="/register-credentials"
            element={
              <CredentialRoute>
                <RegisterCredentials />
                </CredentialRoute>
              }
          />
        </Routes>
      </Router>
  );
}

export default AppRoutes;
