import React from 'react';
import ReactGA from 'react-ga';
import './App.css';
import Landing from './components/Landing.js';
import Header from './components/Header.js';
//import Footer from './components/Footer.js';

function initializeReactGA() {
    ReactGA.initialize('UA-138034707-1');
    ReactGA.pageview('/');
}

const App = () => {
  return (
    <div>
      <Header />
      <Landing />
    </div>
  );
};

initializeReactGA();

export default App;
