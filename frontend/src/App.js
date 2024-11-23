import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNewView from './views/MyNewView';
import MainView from './views/MainView';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyNewView />} />
        <Route path="/about" element={<MainView />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;