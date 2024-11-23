import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNewView from './views/MyNewView';
import MainView from './views/MainView';
import OnBoardingView from './views/OnBoardingView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyNewView />} />
        <Route path="/about" element={<MainView />} />
        {/* Add more routes here */}
        <Route path="/onboarding" element={<OnBoardingView />} />
      </Routes>
    </Router>
  );
}

export default App;