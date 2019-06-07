import React from 'react';
import { Bar } from 'react-chartjs-2';
import * as Math from 'mathjs';
import { api_endpoint, colors } from '../../constants.js';
import obj from '../MobileTools.js';

// Define mobile parameters
var em = obj['em'];
var mobile = obj['mobile'];

// Define the mobile modifiers
var chart_title_size = 1.25;
var chart_legend_size = 1.25;
var point_radius = 1.25;
var legend_font_size = 1.4;
if (mobile) {
  chart_title_size = 2.5;
  chart_legend_size = 2.5;
  point_radius = 2.1;
  legend_font_size = 2.25;
}

// Define API parameters
const API = api_endpoint + 'courses/';

class CourseFig3Timeseries extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: {}, loadedAPI: false, uuid: props.uuid }; //props.uuid
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
      var all_semesters = result['course over time']['semesters'];
      var ymin = 5;
      var ymax = 1;

      var data = { labels: [], datasets: [] };
      data.labels = all_semesters;

      // Loop through all instructors and add a dataset for each
      for (var j = 0; j < result['instructors'].length; j++) {
        var instr = result['instructors'][j];
        var instr_data = [];
        var valid_semesters = result['instructors'][j]['semesters'];
        var counter = 0;
        // Check through each semester that this course existed, and add this instructors rating if it exists
        for (var k = 0; k < all_semesters.length; k++) {
          if (valid_semesters.includes(all_semesters[k])) {
            instr_data.push(
              result['instructors'][j]['ratings'][counter].toFixed(2)
            );
            if (result['instructors'][j]['ratings'][counter] < ymin + 0.1) {
              ymin = Math.floor(
                result['instructors'][j]['ratings'][counter] - 0.1
              );
            }
            if (result['instructors'][j]['ratings'][counter] > ymax + 0.1) {
              ymax = Math.ceil(
                result['instructors'][j]['ratings'][counter] + 0.1
              );
            }
            counter += 1;
          } else {
            instr_data.push(null);
          }
        }
        data.datasets.push({
          label: instr['name'],
          fill: false,
          type: 'line',
          borderWidth: 2,
          backgroundColor: colors[j + 2],
          borderColor: colors[j + 2],
          pointBorderColor: 'rgba(0,0,0,1)',
          pointHoverBackgroundColor: colors[j + 2],
          pointHoverRadius: 1.5 * point_radius * em,
          pointHoverBorderColor: 'rgba(0,0,0,1)',
          pointRadius: point_radius * em,
          showLine: false,
          hidden: true,
          strokeColor: 'rgba(0,0,0,1)',
          data: instr_data,
        });
      }
      // Add the average course and average department ratings
      data.datasets.push({
        label:
          result['dept over time']['dept name'] +
          result['course number'] +
          ' (course average)',
        fill: false,
        borderWidth: 2,
        backgroundColor: colors[0],
        borderColor: 'black',
        data: result['course over time']['ratings'].map(function(each_element) {
          if (each_element < ymin + 0.1) {
            ymin = Math.floor(each_element - 0.1);
          }
          if (each_element > ymax + 0.1) {
            ymax = Math.ceil(each_element + 0.1);
          }
          return Number(each_element.toFixed(2));
        }),
      });
      data.datasets.push({
        label: result['dept over time']['dept name'] + ' (department average)',
        fill: false,
        borderWidth: 2,
        backgroundColor: colors[1],
        borderColor: 'black',
        hidden: 'true',
        data: result['dept over time']['ratings'].map(function(each_element) {
          if (each_element < ymin + 0.1) {
            ymin = Math.floor(each_element - 0.1);
          }
          if (each_element > ymax - 0.1) {
            ymax = Math.ceil(each_element + 0.1);
          }
          return Number(each_element.toFixed(2));
        }),
      });
      if (ymax > 5) {
        ymax = 5;
      }
      if (ymin < 1) {
        ymin = 1;
      }
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text:
            'Click an instructor in the legend below to toggle their ratings on or off',
          fontSize: chart_title_size * em,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 0.75 * chart_legend_size * em,
                min: ymin,
                max: ymax,
              },
              scaleLabel: {
                display: true,
                labelString: 'Rating (1-5)',
                fontSize: chart_legend_size * em,
              },
            },
          ],
          xAxes: [
            {
              ticks: { fontSize: 0.9 * chart_legend_size * em },
              scaleLabel: {
                display: true,
                labelString: 'Semester',
                fontSize: 1.25 * chart_legend_size * em,
              },
            },
          ],
        },
        legend: {
          labels: {
            boxWidth: 2 * legend_font_size * em,
            fontSize: legend_font_size * em,
          },
        },
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
          mode: 'nearest',
        },
      };
      return (
        <div>
          <h3 className="subtitle">
            See which professors taught this course over the{' '}
            <b>previous 3 years</b>
          </h3>
          <div className="timeseries-container">
            <Bar data={data} options={options} />
          </div>
        </div>
      );
    }
  }
}
export default CourseFig3Timeseries;
