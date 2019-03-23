import React from 'react';
import { HorizontalBar, Doughnut } from 'react-chartjs-2';
import { schemeSet3 } from 'd3-scale-chromatic'; // This is the colors for the bar chart
import * as Math from 'mathjs';
// import CanvasJS from 'canvasjs';
import { api_endpoint } from '../../constants.js';

// This function will add the proper suffix, i.e 1st, 2nd, 3rd, given integer input
function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + 'st';
  }
  if (j === 2 && k !== 12) {
    return i + 'nd';
  }
  if (j === 3 && k !== 13) {
    return i + 'rd';
  }
  return i + 'th';
}

// Define API input string
const API = api_endpoint + 'courses/';

class Course_Fig2_Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: {}, loadedAPI: false, uuid: props.uuid };
  }

  componentWillMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API + this.state.uuid + '/figure2')
      .then(response => response.json())
      .then(data => this.setState({ result: data.result, loadedAPI: true })); // Initial keying into result
    this.render();
  }

  render() {
    if (!this.state.loadedAPI) {
      return null;
    } else {
      var result = this.state.result;

      // Define the data for the bar chart
      var bar_data = {
        labels: [
          result['dept']['dept name'] + ' Department Average',
          result['dept']['dept name'] +
            '' +
            result['course number'] +
            ' Course Average',
        ],
        datasets: [
          {
            label: '',
            data: [
              result['dept']['dept mean'].toFixed(2),
              result['current course mean'].toFixed(2),
            ],
            backgroundColor: [schemeSet3[0], schemeSet3[2]],
          },
        ],
      };

      // Add data for donut plot
      var donut_data = {
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: [],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [],
      };

      // Add a measurement for each instructor in the api response
      var num_iterations = Math.min(result['instructors'].length, 8); // This will limit the number of bars to 10 total.
      for (var i = 0; i < num_iterations; i++) {
        // Add the labels
        bar_data.labels.push(result['instructors'][i]['name']);
        donut_data.labels.push(result['instructors'][i]['name']);

        // Add the data for bar and donut
        bar_data.datasets[0].data.push(
          result['instructors'][i]['instructor mean in course'].toFixed(2)
        );
        donut_data.datasets[0].data.push(
          result['instructors'][i]['enrollment']
        );

        // Add the colors
        bar_data.datasets[0].backgroundColor.push(schemeSet3[i + 3]);
        donut_data.datasets[0].backgroundColor.push(schemeSet3[i + 3]);
      }

      // This turns the ranking into a 1st, 2nd, etc.
      var course_ranking = ordinal_suffix_of(result['course ranking']);

      // Determine what scale to plot the averages on
      var min_rating = Math.floor(
        Math.min(bar_data.datasets[0].data.map(Number)) - 0.01
      );
      var max_rating = Math.ceil(Math.max(bar_data.datasets[0].data));
      if (max_rating === 6) {
        max_rating = 5;
      }
      // Calculate total enrollment
      var total_enrollment = Math.floor(Math.sum(donut_data.datasets[0].data));

      // We'll modify the options for our chart here
      var bar_options = {
        title: {
          text:
            result['course name'] +
            ' Ratings compared for ' +
            result['most recent sem'],
          display: true,
          fontSize: 24,
        },
        legend: { display: false },
        scales: {
          xAxes: [
            {
              position: 'top',
              scaleLabel: {
                display: true,
                labelString:
                  'Rating from 1 to 5 (range ' +
                  min_rating.toString() +
                  '-' +
                  max_rating.toString() +
                  ' shown)',
                fontSize: 16,
              },
              ticks: {
                beginAtZero: false,
                min: min_rating,
                max: max_rating,
                stepSize: 1,
                fontSize: 18,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontSize: 18,
              },
            },
          ],
        },
      };

      // Add options for donut plot
      var donut_options = {
        title: {
          display: true,
          text: 'Enrollment by Instructor',
          fontSize: 24,
        },
        cutoutPercentage: 40, //Here for innerRadius. It's already exists
        outerRadius: 300, //Here for outerRadius
        responsive: true,
        maintainAspectRatio: false,

        legend: {
          display: false,
        },
      };

      return (
        <div>
          <h2 style={{ padding: '0em' }}>
            {' '}
            This course is ranked {course_ranking} out of{' '}
            {result['dept']['courses in dept']} courses in the{' '}
            {result['dept']['dept name']} department for the{' '}
            {result['most recent sem']} semester.
          </h2>
          <div className="row" style={{ align: 'left' }}>
            <div
              className="col-md-8"
              style={{
                paddingTop: '0.5em',
                paddingBottom: '0.5em',
                padding: '2em',
              }}
            >
              <HorizontalBar
                type="horizontalBar"
                data={bar_data}
                options={bar_options}
              />
            </div>
            <div
              className="col-md-4"
              style={{ padding: '2.5em', verticalAlign: 'middle' }}
            >
              <div style={{ width: '100%', height: '80%' }}>
                <Doughnut data={donut_data} options={donut_options} />
              </div>
              <h6 style={{ padding: '1em' }}>
                {' '}
                {total_enrollment} students were enrolled in{' '}
                {result['most recent sem']}
              </h6>
            </div>
          </div>
        </div>
      );
    }
  }
}
// <h1> {result['course name']} is ranked {ordinal_suffix_of(result['course rating'])} out of {result.dept['courses in dept']} courses in the {result['dept']['dept name']} department </h1>
// , verticalAlign:'middle'
export default Course_Fig2_Chart;
