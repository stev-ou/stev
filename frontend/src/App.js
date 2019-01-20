import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


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
       <LineChart width={600} height={300} data={data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>

         </header>
      </div>
    );
  }
}

export default App;
