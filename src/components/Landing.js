import React from 'react';
import DataView from './DataView.js';
import SearchForm from './SearchForm.js';
import graph from '../static/graph.png';
import { connect } from 'react-redux';
import DisclaimerAlert from './DisclaimerAlert.js';

class LandingComponent extends React.Component {
  render() {
    const valid_search = this.props.valid_search === 'VALID';
    // const valid_search = true // For debugging
    if (!valid_search) {
      return (
        <div>
          <div className="App-landing">
            <nav className="navbar sticky-top">
              <div className="marginlesscontainer container" style={{ paddingTop: '1vw'}}>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 align-self-center">
                  <h2 id="landing-title" >
                    <text className="boldSTEV">S</text>tudent-<text className="boldSTEV">T</text>
                    eacher <text className="boldSTEV">E</text>valuation <text className="boldSTEV">V</text>
                    isualizations at <text className="boldSTEV">OU</text>
                  </h2>
                  <h6 id="landing-subtitle">
                    Search through large public datasets of previous course and
                    instructor reviews at the University of Oklahoma
                  </h6>
                  <div id="search-form">
                    <SearchForm />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 align-self-center">
                  <div id="graph-container">
                    <img
                      id="graph"
                      className="img-fluid mx-auto d-block"
                      src={graph}
                      alt="Cool Graph!"
                    />
                  </div>
                </div>
              </div>
            </nav>
          </div>
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
              href="https://www.ou.edu/provost/course-evaluation-data"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to Dataset
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <DisclaimerAlert history={this.props.history} />
          <DataView />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    valid_search: state.valid_search,
  };
};

export default connect(mapStateToProps)(LandingComponent);
