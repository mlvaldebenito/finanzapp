import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNewView from './views/MyNewView';
import MainView from './views/MainView';
import OnBoardingView from './views/OnBoardingView';
import Login from './views/Login';
import PrivateRoute from './components/PrivateRoute'; // Protect routes
import PublicRoute from './components/PublicRoute'; // Redirect logged-in users
import RegisterCredentials from './views/RegisterCredentials';
import useGetUser from './hooks/useGetUser';


function AppRoutes() {
  const user = useGetUser()
  return (
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
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
                {user?.hasBankCredentials ? <MainView /> : <RegisterCredentials />}
              </PrivateRoute>
            }
          />
          <Route
            path="/register-credentials"
            element={
              <PrivateRoute>
                <RegisterCredentials />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
  );
}

export default AppRoutes;
