import React from 'react';
import ReactGA from 'react-ga';
import './App.css';
import Landing from './components/Landing.js';
import Header from './components/Header.js';
import {connect} from 'react-redux'
import {setStatetoURL} from './actions';
import {UpdateRoute} from './containers/UpdateRoute'
//import Footer from './components/Footer.js';

function initializeReactGA() {
    ReactGA.initialize('UA-138034707-1');
    ReactGA.pageview('/');
}

class App extends React.Component {
	constructor(props) {
		super(props)

		// ROUTING
		// Check to see if props.history are the same as state
		const current_state = props.current_stat
		// This is only deployed if a function is provided to the 
		if (Object.keys(props.match.params).length>0) {
			const url_state = {...props.match.params, search_status:'VALID'}
			console.log(current_state)
			console.log(url_state)
			if (current_state['search_type']!== url_state['search_type'] || current_state['search_text']!== url_state['search_text']) {
				this.props.setStatetoURL({...url_state, user_alerted:current_state['user_alerted']})
			}
		}
	}

	render() {
  return (
    <div>
      <Header />
      <Landing />

    </div>
  )}
};

const mapStateToProps = state => {
  return {
  	current_state: {
    search_type: state.search_type,
    search_text: state.search_text,
    search_status: state.valid_search,
    user_alerted: state.user_alerted}
  };
};

export default connect(mapStateToProps, {setStatetoURL})(App);