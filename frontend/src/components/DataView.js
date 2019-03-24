import React from 'react';
import { connect } from 'react-redux';
import CourseFig1Table from './course/CourseFig1Table.js';
import CourseFig2Chart from './course/CourseFig2Chart.js';
import CourseFig3Timeseries from './course/CourseFig3Timeseries.js';
import CourseFig4TableBar from './course/CourseFig4TableBar.js';

const DataView = props => {
  const uuid = props.search_text;
  // var uuid = 'engr1411'
  //console.log(uuid);
  return (
    <div className="container">
      <div className="graphical-content">
        <div className="table-fig1">
          <CourseFig1Table uuid={uuid} />
        </div>
        <hr style={{ height: 30 }} />
      </div>

      <div className="graphical-content">
        <CourseFig2Chart uuid={uuid} />
      </div>

      <hr style={{ height: 30 }} />

      <div className="graphical-content">
        <CourseFig3Timeseries uuid={uuid} />
      </div>

      <hr style={{ height: 30 }} />

      <div className="graphical-content">
        <CourseFig4TableBar uuid={uuid} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    search_text: state.search_text,
  };
};

export default connect(mapStateToProps)(DataView);
