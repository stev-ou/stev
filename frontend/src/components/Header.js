import React from 'react';
import SearchForm from './SearchForm.js';

class Header extends React.Component {
  //constructor(props) {
  //  super(props);
  //}
  render() {
    return (
      <div className="App-header">
        <nav className="navbar sticky-top bg-dark">
          <div className="w-100 p-1 header_title">
            <h1 className="header_title">
              University of Oklahoma Course & Instructor Reviews
            </h1>
          </div>
          <div className="header-container flex-md-nowrap w-80 p-1">
            <SearchForm />
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
