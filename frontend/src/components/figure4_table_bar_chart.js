import React from 'react';
import { Bar} from 'react-chartjs-2';
import { schemePaired } from 'd3-scale-chromatic'; // This is the colors for the bar chart
import * as Math from 'mathjs';
import { api_endpoint } from '../constants.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

// Define API input string
const API = api_endpoint + 'courses/';

class Fig4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result: {}, loadedAPI: false, uuid: props.uuid, display_questions:[] };
  }
    componentWillMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API + this.state.uuid + '/figure4')
      .then(response => response.json())
      .then(data => {
            this.setState({ result: data.result, loadedAPI: true, display_questions:Array(data.result.questions.length).fill(true)})}); // Initial keying into result
  }


  render() {
    if (!this.state.loadedAPI) {
      return null;
    }
     else {
      var result = this.state.result;
      var display_questions = this.state.display_questions

      // Lets build our plot results to take data from the api and turn them into the form usable by the bar chart
      var plot_result ={}

      plot_result['labels'] = result.instructors
      plot_result.datasets = []

      const products = [];
      const columns = [{
        dataField: 'question',
        text: 'Question',
        headerStyle: { width: '70%', textAlign: 'left' }}, 
        {
        dataField: 'avgRating',
        text:'Average Rating in Course (1-5)',
        headerStyle:{ width: '30%', textAlign: 'left' }
      }];


      for (var i=0; i<result.questions.length; i++){
        // This modifies the data for the chart
        plot_result.datasets.push({
            label: 'Question '+(i+1).toString(),
            id:i+1,
            backgroundColor: schemePaired[2*i],
            borderColor: 'rgba(255,255,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: schemePaired[2*i+1],
            hidden: !display_questions[i],
            hoverBorderColor: 'rgba(255,255,255,1)',
            data: result.questions[i].ratings
          })

        // This modifies the data for the table
        products.push({
          qNumber: i+1,
          question: result.questions[i]['question'],
          avgRating: (result.questions[i]['ratings'].reduce((a,b) => a + b, 0) / result.questions[i]['ratings'].length).toFixed(2)
        })
      }
      // Chart options
      var plot_options = {
        scales: {
                      yAxes: [{
                          stacked: false,
                          scaleLabel: {
                          display: true,
                          labelString:'Question Rating',
                          fontSize: 20},
                          ticks: {
                          beginAtZero: true,
                          min: 0,
                          max: 5,
                          stepSize: 1,
                          fontSize: 16,
                        },
                      }],
                      xAxes: [{
                          stacked: false,
                          ticks: {fontSize:16},
                          scaleLabel: {
                          display: true,
                          labelString:'Instructors',
                          fontSize: 20},
                      }]
                  },
                  hover: {
                      mode: 'dataset'
                    },
                  legend:{display:false},
      }

      // // We'll modify the options for our chart here
      // var bar_options = {
      //   legend: { display: false },
      //   scales: {
      //     xAxes: [
      //       {
      //         position: 'top',
      //         scaleLabel: {
      //           display: true,
      //           labelString:
      //             'Rating from 1 to 5 (range '+
      //             ' shown)',
      //           fontSize: 16,
      //         },
      //         ticks: {
      //           beginAtZero: false,
      //           min: 1,
      //           max: 5,
      //           stepSize: 1,
      //           fontSize: 18,
      //         },
      //       },
      //     ],
      //     yAxes: [
      //       {
      //         ticks: {
      //           fontSize: 18,
      //         },
      //       },
      //     ],
      //   },
      // };

      // These are the row events for clicking on the table
      const rowEvents = {
        onClick: (e, row, rowIndex) => {
          console.log(rowIndex.toString())
          // We want to remove a dataset
        }
      };

      // Get a list of selected rows
      var selected = []
      for (var i=0; i<display_questions.length; i++){
        if (display_questions[i]) {
          selected.push(i+1)
        }
      }
      console.log(selected);

      const selectRow = {mode: 'checkbox',
      selected: selected, clickToSelect: true, style: (row, rowIndex) => { return schemePaired[0]},
            onSelect: (row, isSelect, rowIndex, e) => {
              console.log(rowIndex)
              // Change the rows hidden status
              display_questions[rowIndex] = !display_questions[rowIndex]
              // Update the state
              this.setState({display_questions:display_questions})
        },
        bgColor: (row, rowIndex) => {
            return schemePaired[parseInt(2*rowIndex)];  // returns the color code for this paired analysis
          }
  
      };

      return (
        <div style={{'padding':'1em'}}>
              <h2 style={{'padding':'0.5em'}}> Question responses by instructor over the last 3 years </h2>
              <BootstrapTable keyField='qNumber' data={ products } columns={ columns } selectRow={selectRow}/>
              <Bar data={plot_result} options={plot_options} />
        </div>
      );
    }
  }
}


// <h1> {result['course name']} is ranked {ordinal_suffix_of(result['course rating'])} out of {result.dept['courses in dept']} courses in the {result['dept']['dept name']} department </h1>
// , verticalAlign:'middle'
export default Fig4;
