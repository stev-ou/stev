// this will be an alert that is cued when the user first 

import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { connect } from 'react-redux';
import { alertUser } from '../actions';

class DisclaimerAlert extends React.Component {

	createMessage() {
  	return <p> Student evals <a href='https://google.com'> hypertext </a> here</p> 
	}
  componentDidMount() {
    this.props.alertUser()

  }

  user_alerted() {

  }
  render() {
    const user_alerted = this.props.user_alerted
    if (!this.props.user_alerted){
  	confirmAlert({
      title: 'Data Disclaimer',
      message: 'hmm',
      buttons: [
        {
          label: 'I Acknowledge',
          // onClick: () => this.UnMount()
        },
      ]
    });
  }
  
  return null;
}
}

const mapStateToProps = state => {
  return {
    user_alerted: state.user_alerted,
  };
};


export default connect(mapStateToProps, {alertUser})(DisclaimerAlert);
