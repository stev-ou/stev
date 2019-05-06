import Landing from './components/Landing.js';
import Header from './components/Header.js';
import React from 'react'

class AppRouter extends React.Component {
	constructor(props){
		super(props)
	}
	render() {
		return (
			<div>
			<Header />
			<Landing />
			</div>
			)
	}

}

export default AppRouter