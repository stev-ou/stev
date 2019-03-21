import React from 'react';
import {Line} from 'react-chartjs-2';
// import * as Math from 'mathjs';
import { api_endpoint } from '../../constants.js';

// Define API parameters
const API = api_endpoint + 'courses/';

class Fig3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result: {}, loadedAPI: false, uuid:props.uuid}; //props.uuid 
  }

  componentWillMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API + this.state.uuid + '/figure3')
      .then(response => response.json())
      .then(data => this.setState({ result: data.result, loadedAPI: true })); // Initial keying into result
  }

  render() {
    if (!this.state.loadedAPI) {
      return null;
    } else {
      var result = this.state.result;

      // Define a color pallete to use
      var colors = [
        '#3f51b5',
        '#ff5722',
        '#e91e63',
        '#673ab7',
        '#ffc107',
        '#9c27b0',
        '#00bcd4',
        '#03a9b4',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#f44336',
        '#795548',
        '#607d8b',
        '#4caf50',
        '#2196f3',
        '#8bc34a',
        '#ff9800',
      ];
      // colors.sort(function() {
      //   return 0.5 - Math.random();
      // });
      //Use this to randomize color order
      // Modify the data to get it into the form needed by the TimeSeriesChart function

      //Build the data object for each Semester in the course over time
      // Define some commonly accessed objs
      var all_semesters = result['course over time']['semesters'];

      var data = {labels:[], datasets:[]};
      data.labels =all_semesters

      // Loop through all instructors and add a dataset for each
      for (var j = 0; j < result['instructors'].length; j++) {
          var instr = result['instructors'][j];
          var instr_data =[]
          var valid_semesters = result['instructors'][j]['semesters']
          var counter = 0
          // Check through each semester that this course existed, and add this instructors rating if e
          for (var k = 0; k < all_semesters.length; k++) {
            if (valid_semesters.includes(all_semesters[k])) {
              instr_data.push(result['instructors'][j]['ratings'][counter].toFixed(2))
              counter+=1
            }
            else {
              instr_data.push(null)
            }
          }
          data.datasets.push({
          label: instr['name'],
          fill: false,
          borderWidth: 2,
          backgroundColor: colors[j+2],
          borderColor: colors[j+2],
          pointBorderColor: 'rgba(0,0,0,1)',
          pointHoverBackgroundColor: colors[j+2],
          pointHoverRadius: 12,
          pointHoverBorderColor:'rgba(0,0,0,1)',
          pointRadius: 8,
          showLine: true,
          strokeColor: 'rgba(0,0,0,1)',
          data: instr_data
          })}
        data.datasets.push({
      label: result['course over time']['course name'] + ' Course',
      fill: false,
      borderWidth: 3,
      backgroundColor: colors[0],
      borderColor: colors[0],
      pointBorderColor: colors[0],
      pointHoverBackgroundColor: colors[0],
      pointHoverRadius: 2,
      pointHoverBorderColor:colors[0],
      pointRadius: 0,
      pointHitRadius:5,
      showLine: true,
      spanGaps: true,
      strokeColor: 'rgba(0,0,0,1)',
      data: result['course over time']['ratings'].map(function(each_element){
    return Number(each_element.toFixed(2))})
      })
      data.datasets.push({
      label: result['dept over time']['dept name']+' Department',
      fill: false,
      borderWidth: 2,
      backgroundColor: colors[1],
      borderColor: colors[1],
      pointBorderColor: colors[1],
      pointHoverBackgroundColor: colors[1],
      pointHoverRadius: 2,
      pointHoverBorderColor:colors[1],
      pointHitRadius:5,
      pointRadius: 0,
      showLine: true,
      spanGaps: true,
      strokeColor: 'rgba(0,0,0,1)',
      data: result['dept over time']['ratings'].map(function(each_element){
    return Number(each_element.toFixed(2))})
      })
        const options={
          title: {display:true,
            text:'Click a dataset in the legend below to toggle it on or off'},
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Course Rating (1-5)'
              }
            }],
            xAxes:[{
              scaleLabel: {
                display: true,
                labelString: 'Semester'
              }
            }]},
            tooltips: {
            mode: 'index',
            // callbacks: {
            //         label: function (tooltipItem, data) {
            //             const tooltip = data.datasets[tooltipItem.datasetIndex];
            //             const value = tooltip.data[tooltipItem.index];
            //             return value === 0 ? null : tooltip.label + ': ' + value;
            //         }
            //     }
           },
           hover: {
              mode: 'dataset'
           }  
        }
        return (
          <div>
          <h3> Course and instructor ratings over the previous 3 years</h3>
          <Line data={data} options = {options}/>
          </div>
        );
    }
  }
}
 export default Fig3;