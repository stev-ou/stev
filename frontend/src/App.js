import React from 'react';
import './App.css';
import Landing from './components/Landing.js';
import Header from './components/Header.js';
//import Footer from './components/Footer.js';

import SearchAutocomplete from './components/SearchAutocomplete.js'
import SearchForm from './components/SearchForm.js'

const App = () => {
  return (
    <div>
      <Header />
      <Landing />

    </div>
  );
};

export default App;
