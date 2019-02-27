import React from 'react';

import { connect } from 'react-redux';

class LandingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const valid_search = this.props.valid_search;
    if (!valid_search) {
      return (
        <div className="App">
          <div className="Info">
            <p>
              {' '}
              Disclaimer: This website is not affiliated with nor approved by
              the University of Oklahoma. Its sole purpose is to inform students
              and prompt action against garbage-can professors whom require
              removal. There is no warranty nor any guaranetee on the validity
              of the data. Data is publicly available and ingested from the
              University's public releases. Thank you and have a good time.
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
      return <h1> This is where the timeserieschart would go. </h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    valid_search: state.valid_search,
  };
};

const mapDispatchToProps = dispatch => {
  return;
};

const Landing = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingComponent);

export default Landing;
