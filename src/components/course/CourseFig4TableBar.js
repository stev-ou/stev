import React from 'react';
import { Bar } from 'react-chartjs-2';
import { schemePaired } from 'd3-scale-chromatic'; // This is the colors for the bar chart
import { api_endpoint } from '../../constants.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import obj from '../MobileTools.js'

// Define mobile parameters
var em = obj['em']
var mobile = obj['mobile']

// Define the mobile modifiers
var header_size = 1.1
var label_size = 1.25
if (mobile) {
  header_size = 2.75
  label_size = 2.25
}

// Define API input string
const API = api_endpoint + 'courses/';

class CourseFig4TableBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      loadedAPI: false,
      uuid: props.uuid,
      display_questions: [],
    };
  }
  componentWillMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API + this.state.uuid + '/figure4')
      .then(response => response.json())
      .then(data => {
        this.setState({
          result: data.result,
          loadedAPI: true,
          display_questions: Array(data.result.questions.length).fill(true),
        });
      }); // Initial keying into result
  }

  render() {
    if (!this.state.loadedAPI) {
      return null;
    } else {
      var result = this.state.result;
      var display_questions = this.state.display_questions;

      // Lets build our plot results to take data from the api and turn them into the form usable by the bar chart
      var plot_result = {};

      plot_result['labels'] = result.instructors;
      plot_result.datasets = [];

      const products = [];
      const columns = [
        {
          dataField: 'question',
          text: 'Question',
          headerStyle: { width: '65%', textAlign: 'left', fontSize:header_size*em},
        },
        {
          dataField: 'avgRating',
          text: 'Average Rating in Course (1-5)',
          headerStyle: { width: '35%', textAlign: 'left', fontSize: header_size*em },
        },
      ];

      for (var j = 0; j < result.questions.length; j++) {
        // This modifies the data for the chart
        plot_result.datasets.push({
          label: 'Question ' + (j + 1).toString(),
          id: j + 1,
          backgroundColor: schemePaired[2 * j],
          borderColor: 'rgba(255,255,255,1)',
          borderWidth: 1,
          hoverBackgroundColor: schemePaired[2 * j + 1],
          hidden: !display_questions[j],
          hoverBorderColor: 'rgba(255,255,255,1)',
          data: result.questions[j].ratings.map(function(each_element) {
            return Number(each_element.toFixed(2));
          }),
        });

        // This modifies the data for the table
        products.push({
          qNumber: j + 1,
          question: result.questions[j]['question'],
          avgRating: (
            result.questions[j]['ratings'].reduce((a, b) => a + b, 0) /
            result.questions[j]['ratings'].length
          ).toFixed(2),
        });
      }
      // Chart options
      var plot_options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              stacked: false,
              scaleLabel: {
                display: true,
                labelString: 'Question Rating',
                fontSize: 1.2*label_size*em,
              },
              ticks: {
                beginAtZero: false,
                min: 1,
                max: 5,
                stepSize: 1,
                fontSize: 0.75*label_size*em,
              },
            },
          ],
          xAxes: [
            {
              stacked: false,
              ticks: { fontSize: 0.9*label_size*em},
              scaleLabel: {
                display: true,
                labelString: 'Instructors',
                fontSize: 1.2*label_size*em,
              },
            },
          ],
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        legend: { display: false },
      };

      // Get a list of selected rows
      var selected = [];
      for (var i = 0; i < display_questions.length; i++) {
        if (display_questions[i]) {
          selected.push(i + 1);
        }
      }

      const selectRow = {
        mode: 'checkbox',
        selected: selected,
        clickToSelect: true,
        style: (row, rowIndex) => {
          return schemePaired[0];
        },
        onSelect: (row, isSelect, rowIndex, e) => {
          // Change the rows hidden status
          display_questions[rowIndex] = !display_questions[rowIndex];
          // Update the state
          this.setState({ display_questions: display_questions });
        },
        onSelectAll: (isSelect, rows, e) => {
          display_questions = Array(display_questions.length).fill(isSelect);
          // Update the state
          this.setState({ display_questions: display_questions });
        },
        bgColor: (row, rowIndex) => {
          return schemePaired[parseInt(2 * rowIndex)]; // returns the color code for this paired analysis
        },
      };

      return (
        <div >
          <h3 className= 'subtitle'>
            {' '}
            Question responses in this course, sorted by instructor{' '}
          </h3>
          <BootstrapTable
            keyField="qNumber"
            data={products}
            columns={columns}
            selectRow={selectRow}
            rowStyle={{fontSize: 0.9*header_size*em}}
          />
          <div className='question-fig'>
          <Bar data={plot_result} options={plot_options} />
          </div>
        </div>
      );
    }
  }
}

// <h1> {result['course name']} is ranked {ordinal_suffix_of(result['course rating'])} out of {result.dept['courses in dept']} courses in the {result['dept']['dept name']} department </h1>
// , verticalAlign:'middle'
export default CourseFig4TableBar;
