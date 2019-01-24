import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import './App.css';

const data = [
      {name: 'Fall 2018', Janet: 4000, Sam: 2400, Joe: 2400},
      {name: 'Spring 2019', Janet: 3000, Sam: 1398, Joe: 2210},
      {name: 'Summer 2019', Janet: 2000, Sam: 9800, Joe: 2290},
      {name: 'Fall 2019', Janet: 2780, Sam: 3908, Joe: 2000},
      {name: 'Spring 2020', Janet: 1890, Sam: 4800, Joe: 2181},
      {name: 'Summer 2020', Janet: 2390, Sam: 3800, Joe: 2500},
      {name: 'Fall 2020', Janet: 3490, Sam: 4300, Joe: 2100},
];

const TimeSeriesChart = props => (
    <LineChart width={800} height={400} data={data}
    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="Sam" stroke="#8884d8" strokeWidth={3} activeDot={{r: 6}}/>
        <Line type="monotone" dataKey="Janet" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Joe" stroke="#868788" />
    </LineChart>
);

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        search_type: 'instructor',
        search_text: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('You entered: ' + this.state.search_type + " " + this.state.search_text);
    //event.preventDefault();
    this.setState({valid_search: true})
  }

  render() {
    return (
      <form className="SearchForm" onSubmit={this.handleSubmit}>
        <label>
          Search by:
          <select name='search_type' style={{'margin-left': '10px'}} value={this.state.search_type} onChange={this.handleInputChange}>
            <option value="instructor">Instructor</option>
            <option value="department">Department</option>
            <option value="course_number">Course Number</option>
          </select>
        </label>
        <input name='search_text' type='text' value={this.state.search_text} onChange={this.handleInputChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const Landing = props => (
    <div className="App">
        <header className="App-header">
          <p>
              University of Oklahoma Student Reviews
          </p>
        </header>
        <div className="Info">
            <p> Disclaimer: This website is not affiliated with nor approved by the University of Oklahoma. Its sole purpose is to inform students and prompt action against garbage-can professors whom require removal. There is no warranty nor any guaranetee on the validity of the data. Data is publicly available and ingested from the University's public releases. Thank you and have a good time.
            </p>
        </div>
        <a
            className="App-link"
            href="https:\/\/www.ou.edu/provost/course-evaluation-data"
            target="_blank"
            rel="noopener noreferrer"
        >
            Link to data
        </a>
        <SearchForm />
    </div>
);

class LandingController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {valid_search: false}
    }

    render() {
        const valid_search = this.state.valid_search;
        if (!valid_search) {
            return <Landing />
        }
        return <TimeSeriesChart />;
    }
}

const App = props => {
    return (
        <LandingController />
    );
}

export default App;
