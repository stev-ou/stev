import React from 'react';
import '../App.css';
import Header from './Header.js';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { prior_state: this.props.current_state };
  }
  componentDidMount() {
  }
  componentDidUpdate() {}

  render() {
    return (
      <div>
      <Header />
        <h1>
        About the Project
        </h1>

      </div>
    );
  }
}

export default About
