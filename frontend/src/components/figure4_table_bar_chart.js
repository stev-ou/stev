import React from 'react';
import { Bar} from 'react-chartjs-2';
import { schemeAccent } from 'd3-scale-chromatic'; // This is the colors for the bar chart
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
  }

  render() {
    if (!this.state.loadedAPI) {
      return null;
    } else {
      var result = this.state.result;

      const this_data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: schemeAccent[1],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            label: 'My Second dataset',
            backgroundColor: schemeAccent[0],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          },
                    {
            label: 'My Third dataset',
            backgroundColor: schemeCategory10[2],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      };

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
      const products = [ {price: '20 dolla', name: 'sexual favors', id: 'bertha jorkins'},{price: '20 dolla', name: 'sexual favors', id: 'donald glover'},{price: '20 dolla', name: 'sexual favors', id: 'Donald trump'}];
      const columns = [{
        dataField: 'id',
        text: 'Product ID'
      }, {
        dataField: 'name',
        text: 'Product Name'
      }, {
        dataField: 'price',
        text: 'Product Price'
      }];
      const rowEvents = {
        onClick: (e, row, rowIndex) => {
          console.log(rowIndex.toString())
        }
      };
      const selectRow = {mode: 'checkbox',
      selected: [0,1,2], style: {background: "light gray"},
            onSelect: (row, isSelect, rowIndex, e) => {
              console.log(row)
        }
      };


  

      return (
        <div>
              <BootstrapTable keyField='id' data={ products } columns={ columns } selectRow={selectRow}/>

              <Bar data={this_data} options={{
                  scales: {
                      xAxes: [{
                          stacked: false
                      }],
                      yAxes: [{
                          stacked: false
                      }]
                  }
              }} />
        </div>
      );
    }
  }
}


// <h1> {result['course name']} is ranked {ordinal_suffix_of(result['course rating'])} out of {result.dept['courses in dept']} courses in the {result['dept']['dept name']} department </h1>
// , verticalAlign:'middle'
export default Fig4;
