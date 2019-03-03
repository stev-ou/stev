import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const new_data = [
  { name: 'Fall 2018', Janet: 4000, Sam: 2400, Joe: 2400 },
  { name: 'Spring 2019', Janet: 3000, Sam: 1398, Joe: 2210 },
  { name: 'Summer 2019', Janet: 2000, Sam: 2000, Joe: 2290 },
  { name: 'Fall 2019', Janet: 2780, Sam: 3908, Joe: 2000 },
  { name: 'Spring 2020', Janet: 1890, Sam: 4800, Joe: 2181 },
  { name: 'Summer 2020', Janet: 2390, Sam: 3800, Joe: 2500 },
  { name: 'Fall 2020', Janet: 3490, Sam: 4300, Joe: 2100 },
];
// Define API parameters
const API = 'http://localhost:5050/api/v0/courses/';

class Fig3 extends React.Component {
  constructor(props) {
    super(props)
    this.state = { result: {}, loadedAPI: false, uuid: props.uuid };
  }

  componentWillMount() {
  // This will call the api when the component "Mounts", i.e. when the page is accessed
  fetch(API + this.state.uuid + '/figure3')
    .then(response => response.json())
    .then(data => this.setState({ result: data.result, loadedAPI: true })); // Initial keying into result
  this.render();
  }

  render() {
    if (!this.state.loadedAPI) {
      return null;
    } else {
      var result = this.state.result;
      const myTimeSeries = TimeSeriesChart({data:new_data});

      // Modify the data to get it into the form needed by the TimeSeriesChart function

      return(
      myTimeSeries
      )
    }}}


const TimeSeriesChart = props => (
  <div className="recharts-wrapper" style={{padding:'1em', align: 'center'}}>
  <ResponsiveContainer width="90%" height={500} style={{display:'inline-block', align:'center'}}>
    <LineChart
      // width={800}
      // height={400}
      data={props.data}
      // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      style={{display: "inline-block"}}
    >
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Sam"
        stroke="#8884d8"
        fill="#8884d8"
        strokeWidth={3}
        activeDot={{ r: 6 }}
      />
      <Line type="monotone" dataKey="Janet" stroke="#82ca9d" fill="#82ca9d" />
      <Line type="monotone" dataKey="Joe" stroke="#868788" fill="#868788" />
    </LineChart>
    </ResponsiveContainer>
    </div>
);



export default Fig3;
