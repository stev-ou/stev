import React from 'react';
import './App.css';
import Landing from './components/landing.js';
import Header from './components/Header.js';
import DataView from './components/DataView.js';

// consider converting to function
const App = () => {
  return (
    //<LandingController />
    <div>
      <Header />
      <DataView />
      <Landing />
    </div>
  );
};

// <TimeSeriesChart data={new_data}/>

export default App;
