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
    this.state = { result: {}, loadedAPI: true, uuid: props.uuid };
  }

  componentWillMount() {
    // // This will call the api when the component "Mounts", i.e. when the page is accessed
    // fetch(API + this.state.uuid + '/figure2')
    //   .then(response => response.json())
    //   .then(data => this.setState({ result: data.result, loadedAPI: true })); // Initial keying into result
    // this.render();

          var result = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            id:1,
            backgroundColor: schemePaired[0],
            borderColor: 'rgba(255,255,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: schemePaired[1],
            hidden: false,
            hoverBorderColor: 'rgba(255,255,255,1)',
            data: [65, 20, 67, 40, 50, 90, 8]
          },
          {
            label: 'My Second dataset',
            id: 2,
            backgroundColor: schemePaired[2],
            borderColor: 'rgba(255,255,255,1)',
            borderWidth: 1,
            hidden: false,
            hoverBackgroundColor: schemePaired[3],
            hoverBorderColor: 'rgba(255,255,255,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
                    {
            label: 'My Third dataset',
            id: 3,
            hidden: false,
            backgroundColor: schemePaired[4],
            borderColor: 'rgba(255,255,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: schemePaired[5],
            hoverBorderColor: 'rgba(255,255,255,1)',
            data: [21,56,78,90,41,47,71]
          },
           {
            label: 'My Third dataset',
            id: 3,
            hidden: false,
            backgroundColor: schemePaired[6],
            borderColor: 'rgba(255,255,255,1)',
            borderWidth: 1,
            hoverBackgroundColor: schemePaired[7],
            hoverBorderColor: 'rgba(255,255,255,1)',
            data: [12,12,11,19,68,72,30]
          }
        ]
      };
      this.setState({result:result})

  }

  render() {
    if (!this.state.loadedAPI) {
      return null;
    } else {
      var result = this.state.result;

      // // We'll modify the options for our chart here
      // var bar_options = {
      //   title: {
      //     text:
      //       result['course name'] +
      //       ' Ratings compared for ' +
      //       result['most recent sem'],
      //     display: true,
      //     fontSize: 24,
      //   },
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
      const products = [{qNumber: 1, question: 'Boomer?', avgRating:4.2 }, {qNumber: 2, question: 'Hook Em?', avgRating:-98354}, {qNumber: 3, question: 'Sooner?', avgRating:2.1 }, {qNumber: 4, question: 'Roll Tide?', avgRating:1.0 }];
      const columns = [{
        dataField: 'qNumber',
        text: 'Question Number'
      }, {
        dataField: 'question',
        text: 'Question'
      }, {
        dataField: 'avgRating',
        text:'Average Rating in Course (1-5)'
      }];

      const rowEvents = {
        onClick: (e, row, rowIndex) => {
          console.log(rowIndex.toString())
          // We want to remove a dataset

        }
      };
      // Get a list of selected rows
      var selected = []
      var indexes = result.datasets.map(function(obj, index) {
            if(obj.hidden == false) {
              console.log(index)
                return selected.push(index+1);
            }
        })
      console.log(selected);

      const selectRow = {mode: 'checkbox',
      selected: selected, clickToSelect: true, style: (row, rowIndex) => { return schemePaired[0]},
            onSelect: (row, isSelect, rowIndex, e) => {
              console.log(rowIndex)
              // Change the rows hidden status
              if (result.datasets[rowIndex].hidden === false){
                result.datasets[rowIndex].hidden = true
              }
              else {result.datasets[rowIndex].hidden=false}
              // Update the state
              this.setState({result:result})
        },
        bgColor: (row, rowIndex) => {
            return schemePaired[parseInt(2*rowIndex)];  // returns the color code for this paired analysis
          }
  
      };

      return (
        <div>
              <BootstrapTable keyField='qNumber' data={ products } columns={ columns } selectRow={selectRow}/>
              <Bar data={result} options={{
                  scales: {
                      xAxes: [{
                          stacked: false
                      }],
                      yAxes: [{
                          stacked: false
                      }]
                  },
                  legend:{display:false},
              }} />
        </div>
      );
    }
  }
}


// <h1> {result['course name']} is ranked {ordinal_suffix_of(result['course rating'])} out of {result.dept['courses in dept']} courses in the {result['dept']['dept name']} department </h1>
// , verticalAlign:'middle'
export default Fig4;
