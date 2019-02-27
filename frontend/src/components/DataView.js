import React from 'react';
import Fig1 from './figure1_table.js';
import Fig2 from './figure2_chart.js';

// Heres some other options: "ame4442", "ame5720", "ame4970", "ame3523", "ame5903",
const temp_uuid = 'ame4970';
const DataView = () => {
  return (
    <div>
      <div className="graphical-content">
        <div className="table-fig1">
          <Fig1 uuid={temp_uuid} />
        </div>
      </div>
      <Fig2 uuid={temp_uuid} />
    </div>
  );
};

export default DataView;
