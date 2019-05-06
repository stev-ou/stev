import React from 'react';
import ReactGA from 'react-ga';
import './App.css';
import AppRouter from './AppRouter.js'

import { BrowserRouter } from "react-router-dom";
//import Footer from './components/Footer.js';

function initializeReactGA() {
    ReactGA.initialize('UA-138034707-1');
    ReactGA.pageview('/');
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
