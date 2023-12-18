import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CityDetail from './components/CityDetail';
import CityList from './components/CityList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cities" element={<CityList />} />
      <Route path="/cities/:id" element={<CityDetail />} />
    </Routes>
  );
}

export default App;