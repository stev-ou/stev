// this will be an alert that is cued when the user first 

import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
 
class DisclaimerAlert extends React.Component {
	createMessage() {
  	return <p> Student evals <a href='google.com'> hypertext </a> here</p> 
	}
  render() {
  	confirmAlert({
      title: 'Data Disclaimer',
      message: this.createMessage(),
      buttons: [
        {
          label: 'I acknowledge',
          onClick: () => this.UnMount
        },
      ]
    });
    return null;
  }
}

export default DisclaimerAlert;