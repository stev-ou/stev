import React from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'

const UpdateRoute = ({ state, children }) => {
	console.log('Hit FilterLink')
	// Propagates a React State to URL
	console.log(state)
	return(
  <NavLink
    to={'/hmmm'}
    activeStyle={{
      textDecoration: 'none',
      color: 'black'
    }}
  >
    {children}
  </NavLink>
)}

// const mapStateToProps = (state) => {
// return {
// Search_Type: // previously was getVisibleTodos(state.todos, state.visibilityFilter)

// }
// }

export default UpdateRoute//connect(mapStateToProps, null)(UpdateRoute)