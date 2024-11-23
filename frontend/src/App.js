import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNewView from './views/MyNewView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyNewView />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;