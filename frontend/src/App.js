import React from 'react';
import './App.css';
import Landing from './components/landing.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Fig1 from './components/department/figure1_best_instructors.js'

const App = () => {
  return (
    <div>
      {/* <Header />
      <Landing /> */}
      <Fig1 uuid={'engr1411'}/>
    </div>
  );
};

export default App;
