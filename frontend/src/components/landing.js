import React from 'react';

import DataView from './DataView.js';
import { connect } from 'react-redux';

class LandingComponent extends React.Component {
  render() {
    const valid_search = this.props.valid_search === 'VALID';
    if (!valid_search) {
      return (
        <div className="App">
          <div className="Info">
            <p>
              {' '}
              Disclaimer: This website is not affiliated with nor approved by
              the University of Oklahoma. There is no warranty nor any guarantee
              on the validity of the data. 
            </p>
          </div>
          <a
            className="App-link"
            href="https:\/\/www.ou.edu/provost/course-evaluation-data"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to data
          </a>
        </div>
      );
    } else {
      return <DataView />;
    }
  }
}

const mapStateToProps = state => {
  return {
    valid_search: state.valid_search,
  };
};

export default connect(mapStateToProps)(LandingComponent);
