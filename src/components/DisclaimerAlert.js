// this will be an alert that is cued when the user first 

import React from 'react'
import { confirmAlert } from './react-confirm-alert-mod'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { connect } from 'react-redux';
import { alertUser } from '../actions';

class DisclaimerAlert extends React.Component {

	createMessage() {
  	return (

      <p> Student evaluations of teaching are known to have <a href='https://google.com'> inherent biases</a>. 
    Please use this data as
     </p> )
	}
  componentDidMount() {
    if (!this.props.user_alerted){
    confirmAlert({
      title: 'Data Disclaimer',
      message: this.createMessage(),
      buttons: [
        {
          label: 'I Acknowledge',
        },
      ],
      closeOnClickOutside: false
    });
  }
    this.props.alertUser()

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


export default connect(mapStateToProps, {alertUser})(DisclaimerAlert);
