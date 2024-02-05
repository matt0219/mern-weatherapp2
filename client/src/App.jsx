import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CityDetail from './components/CityDetail';
import CityList from './components/CityList';
import Navigation from './components/Navigation';
import Login from '../src/components/Login';

function App() {
  return (
    <>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cities" element={<CityList />} />
      <Route path="/cities/:id" element={<CityDetail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </>
  );
}

export default App;