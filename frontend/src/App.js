import React from 'react';
import './App.css';
import Landing from './components/landing.js';
import Header from './components/Header.js';
//import Footer from './components/Footer.js';
import Fig4 from './components/figure4_table_bar_chart.js'
import Fig3 from './components/figure3_timeseries.js'

const App = () => {
  return (
    <div>
       <Fig4 uuid={'engr1411'}/>
     {/* <Header />
      <Landing /> */}
    </div>
  );
};

export default App;
