import Button from 'react-bootstrap/Button'
import React from 'react';
import { connect } from 'react-redux';
import { setSearchStatus, SearchStatus} from '../actions';


class BackButton extends React.Component {
	constructor(props){
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		this.props.setSearchStatus(SearchStatus.INVALID)
	}
	render(){
	return (
		<Button variant="outline-dark" className='back-button' onClick={this.handleClick}>Back to Home</Button>)
}}

export default connect(
  null,
  { setSearchStatus}
)(BackButton);

