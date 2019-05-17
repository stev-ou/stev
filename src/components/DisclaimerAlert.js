// this will be an alert that is cued when the user first

import React from 'react';
import { confirmAlert } from './react-confirm-alert-mod';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { alertUser } from '../actions';

class DisclaimerAlert extends React.Component {
  constructor(props) {
    super(props);
    this.navigateAway = this.navigateAway.bind(this);
  }
  navigateAway() {
    console.log('Interested in biases');
    this.props.history.push('/about');
  }
  createMessage() {
    return (
      <p>
        {' '}
        Student evaluations of teaching are known to have{' '}
        <a href="http://localhost:3000/about">inherent biases</a>. Please
        consider these biases when using the site.
      </p>
    );
  }
  componentWillUnmount() {}
  componentDidMount() {
    if (!this.props.user_alerted) {
      this.props.alertUser();
      confirmAlert({
        title: 'Data Disclaimer',
        message: this.createMessage(),
        buttons: [
          {
            label: 'I Acknowledge',
          },
        ],
        closeOnClickOutside: false,
      });
    }
  }
  componentDidUpdate() {
    if (!this.props.user_alerted) {
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    user_alerted: state.user_alerted,
  };
};

export default connect(
  mapStateToProps,
  { alertUser }
)(DisclaimerAlert);
