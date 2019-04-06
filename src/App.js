import React from 'react';
import './App.css';
import Landing from './components/Landing.js';
import Header from './components/Header.js';
//import Footer from './components/Footer.js';
import CourseChip from './components/course/CourseChip.js'

const App = () => {
  return (
    <div>
       <Header />
      <Landing /> 
      {/*
  <CourseChip cnum={3411} />*/}

    </div>
  );
};

export default App;
