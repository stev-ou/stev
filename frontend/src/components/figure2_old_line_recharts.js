import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Bar } from 'react-chartjs-2';
import NormalDistribution from 'normal-distribution';
// import CanvasJS from 'canvasjs';

const new_data = [
  { name: 'Fall 2018', Janet: 4000, Sam: 2400, Joe: 2400 },
  { name: 'Spring 2019', Janet: 3000, Sam: 1398, Joe: 2210 },
  { name: 'Summer 2019', Janet: 2000, Sam: 2000, Joe: 2290 },
  { name: 'Fall 2019', Janet: 2780, Sam: 3908, Joe: 2000 },
  { name: 'Spring 2020', Janet: 1890, Sam: 4100, Joe: 2181 },
  { name: 'Summer 2020', Janet: 2390, Sam: 3800, Joe: 2500 },
  { name: 'Fall 2020', Janet: 3490, Sam: 2800, Joe: 2100 },
];

const TimeSeriesChart = props => (
  <div>
    <AreaChart
      width={800}
      height={400}
      data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="Sam"
        stroke="#8884d8"
        fill="#8884d8"
        strokeWidth={3}
        activeDot={{ r: 6 }}
      />
      <Area type="monotone" dataKey="Janet" stroke="#82ca9d" fill="#82ca9d" />
      <Area type="monotone" dataKey="Joe" stroke="#868788" fill="#868788" />
    </AreaChart>
  </div>
);

function create_normal() {
  console.log('hello');
}

// Define API parameters
const API = 'http://localhost:5050/api/v0/courses/ame3440/figure2';
const DEFAULT_QUERY = '';

class Fig2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: {} };
  }

  componentDidMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => this.setState({ result: data.result })); // Initial keying into result
  }

  render() {
    console.log(this.state.result);
    var result = this.state.result;
    // We'll modify the result here

    var data = {
      datasets: [
        {
          label: 'Ratings Compared to Department Rating',
          data: [3.5],
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
        },
        {
          label: 'Who dis',
          data: [3],
          backgroundColor: ['rgba(255, 0, 132, 0.6)'],
        },
        {
          label: 'anotha one',
          data: [-1],
          backgroundColor: ['rgba(255, 0, 132, 0.6)'],
        },
      ],
    };
    return (
      <div>
        <Bar data={data} />
      </div>
    );
  }
}

export default Fig2;
