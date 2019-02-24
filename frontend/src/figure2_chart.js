import React from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {HorizontalBar} from 'react-chartjs-2';
import NormalDistribution from 'normal-distribution';
// import CanvasJS from 'canvasjs';

const new_data = [
      {name: 'Fall 2018', Janet: 4000, Sam: 2400, Joe: 2400},
      {name: 'Spring 2019', Janet: 3000, Sam: 1398, Joe: 2210},
      {name: 'Summer 2019', Janet: 2000, Sam: 2000, Joe: 2290},
      {name: 'Fall 2019', Janet: 2780, Sam: 3908, Joe: 2000},
      {name: 'Spring 2020', Janet: 1890, Sam: 4100, Joe: 2181},
      {name: 'Summer 2020', Janet: 2390, Sam: 3800, Joe: 2500},
      {name: 'Fall 2020', Janet: 3490, Sam: 2800, Joe: 2100},
];

const TimeSeriesChart = props => (
  <div>
    <AreaChart width={800} height={400} data={props.data}
    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
        <YAxis/>
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
        <Legend />
        <Area type="monotone" dataKey="Sam" stroke="#8884d8" fill="#8884d8" strokeWidth={3} activeDot={{r: 6}}/>
        <Area type="monotone" dataKey="Janet" stroke="#82ca9d" fill='#82ca9d'/>
        <Area  type="monotone" dataKey="Joe" stroke="#868788" fill='#868788'/>
    </AreaChart>
  </div>
);

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

// Define API parameters
const API = 'http://localhost:5050/api/v0/courses/ame3440/figure2';
const DEFAULT_QUERY = '';

class Fig2 extends React.Component {
	constructor(props) {
	super(props)
	this.state = {result:{}, loadedAPI:false}
	}

	componentWillMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API+DEFAULT_QUERY)
    .then(response => response.json())
    .then(data => this.setState({result:data.result, loadedAPI:true})); 
    this.render()// Initial keying into result
  }

	render() {
		if ( !this.state.loadedAPI ) {
	      return null;
	    } else {

		console.log(this.state.result)
		var result = this.state.result
		// We'll modify the options for our chart here
		var options = {
		    scales: {
		      xAxes: [{
		        ticks: {
		          beginAtZero: true,
		          min: 0,
		          max: 5,
		          stepSize: 1,
		        }
		      }],
		      xLabel: 'Rating',
		    }
  }

		var data={
		labels:[''],
        datasets:[
          { label: result['dept']['dept name']+' Department Rating Average',
            data:[result['dept']['dept mean'].toFixed(2)],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
            ],
            xAxisID: 0},
            { label: 'Average Course Rating',
            data:[result['current course mean'].toFixed(2)],
            backgroundColor:[
              'rgba(0, 255, 132, 0.6)',
            ],
            xAxisID: 0}

            ]}
        // Add a measurement for 



      var course_ranking = ordinal_suffix_of(result['course ranking'])
		return (
			<div style={{'padding':'1em','width':'80%','display':'inline-block'}}>
			<h2 style={{'padding':'1em'}}> This course is ranked {course_ranking} out of {result['dept']['courses in dept']} courses in the {result['dept']['dept name']} department. </h2>
			<HorizontalBar type='horizontalBar' data={data} options={options}/>
			</div>
			)
	}
}}
// <h1> {result['course name']} is ranked {ordinal_suffix_of(result['course rating'])} out of {result.dept['courses in dept']} courses in the {result['dept']['dept name']} department </h1>
			

export default Fig2;