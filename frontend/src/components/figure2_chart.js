import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { schemeSet3 } from 'd3-scale-chromatic'; // This is the colors for the bar chart
// import CanvasJS from 'canvasjs';

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

// Define API parameters
const API = 'http://localhost:5050/api/v0/courses/';

class Fig2 extends React.Component {
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
      // We'll modify the options for our chart here
      var options = {
        legend: { display: false },
        scales: {
          xAxes: [
            {
              position: 'top',
              scaleLabel: {
                display: true,
                labelString: 'Overall Rating',
                fontSize: 24,
              },
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 5,
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
      var data = {
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
      // Add a measurement for each instructor in the api response
      var num_iterations = Math.min(result['instructors'].length, 8); // This will limit the number of bars to 10 total.
      for (var i = 0; i < num_iterations; i++) {
        data.labels.push(result['instructors'][i]['name'] + ' in course');
        data.datasets[0].data.push(
          result['instructors'][i]['instructor mean in course'].toFixed(2)
        );
        data.datasets[0].backgroundColor.push(schemeSet3[i + 3]);
      }
      // This turns the ranking into a 1st, 2nd, etc.
      var course_ranking = ordinal_suffix_of(result['course ranking']);

      return (
        <div style={{ padding: '1em', width: '80%', display: 'inline-block' }}>
          <h2 style={{ padding: '1em' }}>
            {' '}
            This course is ranked {course_ranking} out of{' '}
            {result['dept']['courses in dept']} courses in the{' '}
            {result['dept']['dept name']} department.{' '}
          </h2>
          <HorizontalBar type="horizontalBar" data={data} options={options} />
        </div>
      );
    }
  }
}
// <h1> {result['course name']} is ranked {ordinal_suffix_of(result['course rating'])} out of {result.dept['courses in dept']} courses in the {result['dept']['dept name']} department </h1>

export default Fig2;
