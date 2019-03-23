import React from 'react';
import { connect } from 'react-redux';

import Course_Fig1 from './course/figure1_table.js';
import Course_Fig2 from './course/figure2_chart.js';
import Course_Fig3 from './course/figure3_timeseries.js';
import Course_Fig4 from './course/figure4_table_bar_chart.js';

const DataView = props => {
  const uuid = props.search_text;
  // var uuid = 'engr1411'
  //console.log(uuid);
  return (
    <div className="container">
      <div className="graphical-content">
        <div className="table-fig1">
          <Course_Fig1 uuid={uuid} />
        </div>
        <hr style={{ height: 30 }} />
      </div>

      <div className="graphical-content">
        <Course_Fig2 uuid={uuid} />
      </div>

      <hr style={{ height: 30 }} />

      <div className="graphical-content">
        <Course_Fig3 uuid={uuid} />
      </div>

      <hr style={{ height: 30 }} />

      <div className="graphical-content">
        <Course_Fig4 uuid={uuid} />
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
