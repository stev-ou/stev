import React from 'react';
import { connect } from 'react-redux';
import Course_Fig1_Table from './course/Course_Fig1_Table.js';
import Course_Fig2_Chart from './course/Course_Fig2_Chart.js';
import Course_Fig3_Timeseries from './course/Course_Fig3_Timeseries.js';
import Course_Fig4_Table_Bar from './course/Course_Fig4_Table_Bar.js';

const DataView = props => {
  const uuid = props.search_text;
  // var uuid = 'engr1411'
  //console.log(uuid);
  return (
    <div className="container">
      <div className="graphical-content">
        <div className="table-fig1">
          <Course_Fig1_Table uuid={uuid} />
        </div>
        <hr style={{ height: 30 }} />
      </div>

      <div className="graphical-content">
        <Course_Fig2_Chart uuid={uuid} />
      </div>

      <hr style={{ height: 30 }} />

      <div className="graphical-content">
        <Course_Fig3_Timeseries uuid={uuid} />
      </div>

      <hr style={{ height: 30 }} />

      <div className="graphical-content">
        <Course_Fig4_Table_Bar uuid={uuid} />
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
