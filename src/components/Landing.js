import React from 'react';
import DataView from './DataView.js';
import { connect } from 'react-redux';
import DisclaimerAlert from './DisclaimerAlert.js'

class LandingComponent extends React.Component {
  render() {
    const valid_search = this.props.valid_search === 'VALID';
    // const valid_search = true // For debugging
    if (!valid_search) {
      return (
        <div className="App">
          <div className="Info">
            <p style={{ fontSize: '0.8em', paddingTop: '2vw' }}>
              {' '}
              <b>Disclaimer</b>: This website is not affiliated with nor
              approved by the University of Oklahoma. There is no warranty nor
              any guarantee on the validity of the data.
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
      return (
        <div>
        <DisclaimerAlert />
        <DataView />
        </div>);
    }
  }
}

const mapStateToProps = state => {
  return {
    valid_search: state.valid_search,
  };
};

export default connect(mapStateToProps)(LandingComponent);
