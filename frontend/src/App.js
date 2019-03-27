import React from 'react';
import './App.css';
import Landing from './components/Landing.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import InstructorFig3TableBar from './components/instructor/InstructorFig3TableBar.js';

const App = () => {
  return (
    <div>
     {/* <Header />
      <Landing /> */}
   <InstructorFig3TableBar uuid={112112705} /> 
    </div>
  );
};

export default App;
