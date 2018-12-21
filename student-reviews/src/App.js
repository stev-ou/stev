import React, { Component } from 'react';
import { LineChart, Line } from 'recharts';


import './App.css';

class App extends Component {
  render() {
    var data = [[0,1], [1,3], [2,5]]
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Search by department or professor
          </p>
          <a
            className="App-link"
            href="https://ou.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </a>
        </header>
      </div>
    );
  }
}

export default App;
