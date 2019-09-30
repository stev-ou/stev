import React from 'react';
import { connect } from 'react-redux';
import { resetToDefaults } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    var hamburger = document.getElementById('hamburger');
    if (['STEV', 'home'].includes(e.target.id)) {
      this.props.history.push('/course');
      if (hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.click();
      }
    } else if (['about', 'getinvolved'].includes(e.target.id)) {
      this.props.history.push('/' + e.target.id);
      if (hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.click();
      }
    } else if (
      ['navbarResponsive', 'span', 'header', 'collapsed-nav-items'].includes(
        e.target.id
      )
    ) {
      return;
    } else {
      if (hamburger.getAttribute('aria-expanded') === 'true') {
        hamburger.click();
      }
    }
  }

  render() {
    return (
      <div>
        <nav
          id="main_nav"
          className="navbar navbar-light navbar-expand-lg bg-white fixed-top"
          style={{ zIndex: 10000, overflow: 'visible' }}
        >
          <div className="container" id="header">
            <button
              type="submit"
              id="STEV"
              className="STEV-navbar-button navbar-brand"
              style={{ outline: 'none', fontSize: '1.5rem', fontWeight: 700 }}
            >
              STEV @ OU
            </button>
            
            <button
              id="hamburger"
              className="custom-toggler navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ outline: 'none' }}
            >
              <span className="navbar-toggler-icon" id="span" />
            </button>
            <div
              className="navbar-collapse collapse w-100 order-3 dual-collapse2"
              id="navbarResponsive"
            >
              <ul id="collapsed-nav-items" className="navbar-nav ml-auto">
                <li className="nav-item navbar-nav mr-auto">
                  <button
                    type="submit"
                    className="STEV-navbar-button"
                    id="home"
                    style={{ outline: 'none' }}
                  >
                    Home
                  </button>
                </li>
                <li className="nav-item navbar-nav mr-auto">
                  <button
                    type="submit"
                    className="STEV-navbar-button"
                    id="about"
                    style={{ outline: 'none' }}
                  >
                    About
                  </button>
                </li>
                <li className="nav-item navbar-nav mr-auto">
                  <button
                    type="submit"
                    className="STEV-navbar-button"
                    id="getinvolved"
                    style={{ outline: 'none', marginRight: 0 }}
                  >
                    Get Involved
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(
  null,
  { resetToDefaults }
)(Header);
