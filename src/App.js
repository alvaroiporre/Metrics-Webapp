import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Map from './components/Map';
import Home from './components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:countryId" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
