import React from 'react';
import { Bar } from 'react-chartjs-2';
import { schemeSet3 } from 'd3-scale-chromatic'; // This is the colors for the bar chart
import { api_endpoint } from '../../constants.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import obj from '../MobileTools.js';

var question_colors = schemeSet3.slice(2);

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

// Define mobile parameters
var em = obj['em'];
var mobile = obj['mobile'];

// Define the mobile modifiers
var header_size = 1.2;
var label_size = 1.25;
if (mobile) {
  header_size = 2.75;
  label_size = 2.25;
}
// Define API input string
const API = api_endpoint + 'instructors/';

class InstructorFig3TableBar extends React.Component {
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
    fetch(API + this.state.uuid + '/figure3')
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

      // Initialize at opposite max value, then decrement/increment if found
      var ymin = 5;
      var ymax = 1;

      // Lets build our plot results to take data from the api and turn them into the form usable by the bar chart
      var plot_result = {};

      plot_result['labels'] = result.courses;
      plot_result.datasets = [];

      const products = [];
      const columns = [
        {
          dataField: 'question',
          text: 'Question',
          headerStyle: {
            width: '65%',
            textAlign: 'left',
            fontSize: header_size * em,
          },
        },
        {
          dataField: 'avgRating',
          text: 'Instructor Average Rating (1-5)',
          headerStyle: {
            width: '35%',
            textAlign: 'left',
            fontSize: header_size * em,
          },
        },
      ];

      for (var j = 0; j < result.questions.length; j++) {
        // This modifies the data for the chart
        plot_result.datasets.push({
          label: 'Question ' + (j + 1).toString(),
          id: j + 1,
          backgroundColor: question_colors[j],
          borderColor: 'rgba(255,255,255,1)',
          borderWidth: 1,
          hoverBackgroundColor: shadeColor(question_colors[j], -10),
          hidden: !display_questions[j],
          hoverBorderColor: 'rgba(255,255,255,1)',
          // eslint-disable-next-line
          data: result.questions[j].ratings.map(function(each_element) {
            if (each_element !== 0) {
              if (each_element - 0.1 < ymin) {
                ymin = Math.floor(each_element - 0.1);
              }
              if (each_element + 0.1 > ymax) {
                ymax = Math.ceil(each_element + 0.1);
              }
            }
            if (each_element === 'none' || each_element === 0) {
              return null;
            } else {
              return Number(each_element.toFixed(2));
            }
          }),
        });
        // Check to get only questions that exist for this course
        var non_empty_questions_length = result.questions[j].ratings.filter(e => e !== 0).length;

        // This modifies the data for the table
        var q = String(result.questions[j]['question']); 
        // These are temporary fixes for a backend issue - 191203
        if (q === "The instructor was well"){
          q = "The instructor was well-organized and made adequate preparation for class";
        }
        if (q === "The instructor related course material to professional practice and") {
          q = "The instructor related course material to professional practice and/or research";
        }
        // This modifies the data for the table
        products.push({
          qNumber: j + 1,
          question: q,
          avgRating: (
            result.questions[j].ratings.reduce((a, b) => a + b, 0) /
            non_empty_questions_length
          ).toFixed(2),
        });
      }

      // Check to make sure ymin, ymax in valid range
      if (ymax > 5) {
        ymax = 5;
      }
      if (ymin < 1) {
        ymin = 1;
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
                fontSize: 1.2 * label_size * em,
              },
              ticks: {
                beginAtZero: false,
                min: ymin,
                max: ymax,
                stepSize: 1,
                fontSize: 0.75 * label_size * em,
              },
            },
          ],
          xAxes: [
            {
              stacked: false,
              ticks: { fontSize: 0.9 * label_size * em },
              scaleLabel: {
                display: true,
                labelString: 'Instructors',
                fontSize: 1.2 * label_size * em,
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
          return question_colors[parseInt(rowIndex)]; // returns the color code for this paired analysis
        },
      };

      return (
        <div>
          <h3 className="subtitle">
            {' '}
            Question responses for {result['instructor name']} over the{' '}
            <b>previous 3 years</b>, sorted by course
          </h3>
          <BootstrapTable
            keyField="qNumber"
            data={products}
            columns={columns}
            selectRow={selectRow}
            rowStyle={{ fontSize: header_size * em }}
          />
          <div className="question-fig">
            <Bar data={plot_result} options={plot_options} />
          </div>
        </div>
      );
    }
  }
}

export default InstructorFig3TableBar;
