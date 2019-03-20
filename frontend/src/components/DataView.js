import React from 'react';
import { connect } from 'react-redux';

import Fig1 from './course/figure1_table.js';
import Fig2 from './course/figure2_chart.js';
import Fig3 from './course/figure3_timeseries.js';
import Fig4 from './course/figure4_table_bar_chart.js';

const DataView = props => {
  const uuid = props.search_text;
  // var uuid = 'engr1411'
  //console.log(uuid);
  return (
    <div className="container">
      <div className="graphical-content">
        <div className="table-fig1">
          <Fig1 uuid={uuid} />
        </div>
        <hr style={{ height: 30 }} />
      </div>

      <div className="graphical-content">
        <Fig2 uuid={uuid} />
      </div>

      <hr style={{ height: 30 }} />

      <div className="graphical-content">
        <Fig3 uuid={uuid} />
      </div>

      <hr style={{ height: 30 }} />

      <div className="graphical-content">
        <Fig4 uuid={uuid} />
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
