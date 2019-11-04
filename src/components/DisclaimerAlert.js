// this will be an alert that is cued when the user first

import React from 'react';
import { confirmAlert } from './react-confirm-alert-mod';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { alertUser } from '../actions';

class DisclaimerAlert extends React.Component {
  createMessage() {
    return (
      <p>
        {' '}
        Student evaluations of teaching are known to have{' '}
        <a href="/about#SETresearch">inherent biases</a>. These 
        biases were assessed in the{' '}
        <a href="https://openbits.app/posts/stev-analysis" target='_blank' rel="noopener noreferrer">
          blog post here</a>. Please consider biases in the data when using this app.
      </p>
    );
  }

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
