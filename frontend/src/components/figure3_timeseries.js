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
import * as Math from 'mathjs'

const newer_data = [
  { name: 'Fall 2018', Sam: 2400, Joe: 2400 },
  { name: 'Spring 2019', Janet: 3000, Sam: 1398, Joe: 2210 },
  { name: 'Summer 2019', Janet: 2000,  Joe: 2290 },
  { name: 'Fall 2019', Sam: 3908, Joe: 2000 },
  { name: 'Spring 2020', Janet: 1890, Sam: 4800, Joe: 2181 },
  { name: 'Summer 2020', Janet: 2390, Sam: 3800},
  { name: 'Fall 2020', Janet: 3490, Sam: 4300},
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

      // Define a color pallete to use
      var colors = ["#3f51b5", "#2196f3", "#03a9f4", "#ff5722", "#e91e63", "#9c27b0","#00bcd4","#4caf50", "#8bc34a","#cddc39", "#ffeb3b","#f44336","#795548", "#607d8b", "#4caf50", "#8bc34a", "#673ab7", "#ffc107", "#ff9800","#009688"]
      colors.sort(function() { return 0.5 - Math.random() }); //Use this to randomize color order
      // console.log(colors)
      // Modify the data to get it into the form needed by the TimeSeriesChart function
      var data=[]

      //Build the data object for each Semester in the course over time
      // Define some commonly accessed objs
      var all_semesters = result['course over time']['semesters']
      var all_course_ratings = result['course over time']['ratings']
      var all_dept_ratings = result['dept over time']['ratings']

      // Loop through all semesters
      for (var i=0; i<all_semesters.length; i++) {
        var current_sem = {}
        current_sem['sem']= all_semesters[i]
        current_sem[result['course over time']['course name']]= all_course_ratings[i]
        current_sem[result['dept over time']['dept name']]= all_dept_ratings[i]

        // Loop through all instructors
        for (var j=0; j<result['instructors'].length; j++) {
          var instr = result['instructors'][j]
          instr['semesters'].indexOf(all_semesters[i])

          if (instr['semesters'].indexOf(all_semesters[i])>=0) {
            current_sem[instr['name']] = instr['ratings'][instr['semesters'].indexOf(all_semesters[i])]
          }
        }
        // Add current sem to data
        data.push(current_sem)
      }
      // Create the lines for each of our datapoints
      var instructors =  []
      for (var k=0; k<result['instructors'].length; k++) {
        instructors.push([k])
      }

      // Define the lines used to define the style to plot each instructor
      var Lines = instructors.map((l) => {
        return (<Line type='monotone' dataKey={result['instructors'][l[0]]['name']} strokeWidth={4} stroke={colors[l[0]+3]}/>)
      })

      const myTimeSeries = TimeSeriesChart({data:data, cname:result['course over time']['course name'], dname:result['dept over time']['dept name'], colors:colors, lines:Lines});

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
      <XAxis dataKey="sem" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={props.cname} strokeWidth={12} stroke={props.colors[0]}/>
      <Line type="monotone" dataKey={props.dname} strokeWidth={9} stroke={props.colors[1]} /> 
      {props.lines}
    </LineChart>
    </ResponsiveContainer>
    </div>
);


export default Fig3;
