import React from 'react';
import '../App.css';


class About extends React.Component {
  constructor(props) {
    super()
  }
  componentDidMount() {
  }
  componentDidUpdate() {}

  render() {
    return (
      <div className='dataview-container'>
        <h3>
        About the Project
        </h3>
        <p>
        This page is currently under development.
        </p>
      </div>
    );
  }
}

export default About
