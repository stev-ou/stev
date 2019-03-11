import React from 'react';
import { connect } from 'react-redux';

import Fig1 from './figure1_table.js';
import Fig2 from './figure2_chart.js';
import Fig3 from './figure3_timeseries.js';
import Fig4 from './figure4_table_bar_chart.js';

const DataView = props => {
  const uuid = props.search_text;
  // var uuid = 'engr1411'
  //console.log(uuid);
  return (
    <div className={['col-md-8', 'col align-self-center'].join(' ')}>
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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    search_text: state.search_text,
  };
};

export default connect(mapStateToProps)(DataView);
