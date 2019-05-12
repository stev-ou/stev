import React from 'react';
import { connect } from 'react-redux';
import BackButton from './BackButton.js';
import { resetToDefaults } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    console.log(this.props)
  }

  handleClick(event) {
    console.log(event)
    this.props.resetToDefaults();
    this.props.history.push('/course')
  }

  render() {
      return (
        <div>
          <nav id="main_nav" className="navbar navbar-light navbar-expand-lg bg-white fixed-top" style={{overflow: 'visible'}}> 
            <div className="container">
              <button
                type="submit"
                className="STEV-navbar-button navbar-brand"
                onClick={this.handleClick}
                style={{outline: "none", fontSize: '1.4rem'}}
              >
                <b>STEV</b> @ OU
              </button>
              <button
                className="custom-toggler navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="true"
                aria-label="Toggle navigation"
              >

                <span className="navbar-toggler-icon"/>

              </button>
                  <div class="navbar-collapse collapse w-100 order-3 dual-collapse2" id='navbarResponsive'>
                    <ul class="navbar-nav ml-auto">
                  <li className="nav-item navbar-nav mr-auto">
                    <button type='submit' className="STEV-navbar-button" onClick={this.handleClick}>Home</button>
                  </li>
                    <li className="nav-item navbar-nav mr-auto">
                    <button type='submit' className="STEV-navbar-button" onClick={this.handleClick}>About</button>
                  </li>
                  <li className="nav-item navbar-nav mr-auto">
                    <button type='submit' className="STEV-navbar-button" onClick={this.handleClick} style={{marginRight: 0}}>Get Involved</button>
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
