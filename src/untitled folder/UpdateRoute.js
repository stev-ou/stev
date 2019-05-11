import React from 'react'
import { NavLink } from 'react-router-dom'
import {connect } from 'react-redux'

class UpdateRoute extends React.Component {
	constructor(props) {
		super(props)
		console.log(props)
	}

	render(){
	// Propagates a React State to URL
	console.log(this.props)
	var append_string = ""
	if (['COURSE', 'INSTRUCTOR'].includes(this.props.search_type)) {
		var append_string = '/searchby/'+this.props.search_type+'/'+this.props.search_text
		// history.push(append_string)
	}

	return(
 {/* <NavLink
    to={append_string}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
  >

  </NavLink> */}
)}
}
const mapStateToProps = (state) => {
return {
search_type: state.search_type, 
search_text: state.search_text,
valid_search: state.valid_search
}
}

export default connect(mapStateToProps, null)(UpdateRoute)