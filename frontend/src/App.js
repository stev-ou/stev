import React from 'react';
import './App.css';
import Landing from './components/landing.js';
import Header from './components/Header.js';
import DataView from './components/DataView.js';

// consider converting to function
const App = () => {
  return (
    <div>
      <Header />
      <Landing />
    </div>
  );
};

export default App;
