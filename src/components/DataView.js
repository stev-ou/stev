import React from 'react';
import { connect } from 'react-redux';
// import Footer from './Footer.js'
import CourseFig1Table from './course/CourseFig1Table.js';
import CourseFig2Chart from './course/CourseFig2Chart.js';
import CourseFig3Timeseries from './course/CourseFig3Timeseries.js';
import CourseFig4TableBar from './course/CourseFig4TableBar.js';
import InstructorFig1Table from './instructor/InstructorFig1Table.js';
import InstructorFig2Timeseries from './instructor/InstructorFig2Timeseries.js';
import InstructorFig3TableBar from './instructor/InstructorFig3TableBar.js';

const DataView = props => {
  const uuid = props.search_text;
  const search_type = props.search_type;
  if (search_type === 'COURSE') {
    return (
      <div className="dataview-container">
        <div className="graphical-content">
          <div className="graphical-content">
            <CourseFig1Table uuid={uuid} />
          </div>

          <hr style={{ height: 30 }} />

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
      </div>
    );
  } else {
    return (
      <div className="dataview-container ">
        <div className="graphical-content">
          <div className="table-fig1">
            <InstructorFig1Table uuid={uuid.toString()} />
          </div>
          <hr style={{ height: 30 }} />
        </div>

        <div className="graphical-content">
          <InstructorFig2Timeseries uuid={uuid.toString()} />
        </div>

        <hr style={{ height: 30 }} />

        <div className="graphical-content">
          <InstructorFig3TableBar uuid={uuid.toString()} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    search_text: state.search_text,
    search_type: state.search_type,
  };
};

export default connect(mapStateToProps)(DataView);
