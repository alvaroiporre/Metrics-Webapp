import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Map from './components/Map';

function App() {
  return (
    <div>
      <BrowserRouter>
        <h1>Metrics Webapp</h1>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/details" element={<h2>Details</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
