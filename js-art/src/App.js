import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import Visuals from './components/Visuals';
import RoundVisuals from './components/RoundVisuals';
import BoxVisuals from './components/BoxVisuals';

function App() {
  const [currentVisual, setCurrentVisual] = useState('points');

  return (
    <div className="App">
      <div className="menu bg-dark p-3 rounded">
        <button className="btn btn-secondary m-1" onClick={() => setCurrentVisual('points')}>Points</button>
        <button className="btn btn-secondary m-1" onClick={() => setCurrentVisual('circles')}>Circles</button>
        <button className="btn btn-secondary m-1" onClick={() => setCurrentVisual('box')}>3D</button>
      </div>

      {currentVisual === 'points' && <Visuals />}
      {currentVisual === 'circles' && <RoundVisuals />}
      {currentVisual === 'box' && <BoxVisuals />}
    </div>
  );
}

export default App;
