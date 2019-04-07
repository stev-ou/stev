import React from 'react';
import SearchForm from './SearchForm.js';
import graph from '../img/graph.png';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    if (this.props.valid_search === 'INVALID') {
      return (
        <div>
          <nav id="main_nav" className="navbar navbar-light navbar-expand-lg">
            <div className="container">
              <a className="navbar-brand" href="./">
                STEV @ OU
              </a>
              <button
                className="custom-toggler navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive" />
            </div>
          </nav>

          <div className="App-header">
            <nav className="navbar sticky-top">
              <div className="container">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 align-self-center">
                  <h2 id="landing-title">
                    <b>S</b>tudent-<b>T</b>eacher <b>E</b>valuation <b>V</b>isualizations at OU
                  </h2>
                  <h6 id="landing-subtitle">
                    Search through large public datasets of previous course reviews at the University of Oklahoma
                  </h6>
                  <div id='search-form'>
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
        </div>
      );
    } else {
      return (
        <nav id="main_nav" className="navbar navbar-light navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="./">
              STEV @ OU
            </a>
            <button
              className="custom-toggler navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive" />
          </div>
        </nav>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    valid_search: state.valid_search,
  };
};

export default connect(mapStateToProps)(Header);
