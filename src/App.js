import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Map from './components/Map';
import Home from './components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <h1>Metrics Webapp</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:countryId" element={<h2><Map /></h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
