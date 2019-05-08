import React from 'react';
import ReactGA from 'react-ga';
import './App.css';
import Landing from './components/Landing.js';
import Header from './components/Header.js';
import {connect} from 'react-redux'
import {setStatetoURL, SearchStatus} from './actions';
//import Footer from './components/Footer.js';

function initializeReactGA() {
    ReactGA.initialize('UA-138034707-1');
    ReactGA.pageview('/');
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state={prior_state:this.props.current_state}
		}
	componentDidMount(){
		const url_state = this.props.match.params
		const current_state = this.props.current_state
		
		// If state and URL different the first time the component mounts, take URL => State
		if (url_state.search_type !==undefined && url_state.search_text !== undefined) {
		this.props.setStatetoURL({...url_state, search_status: 'VALID', user_alerted:current_state['user_alerted']})}

		// this.props.history.push(this.props.location.pathname)
	}
		// ROUTING
		// Check to see if props.history are the same as state
	componentDidUpdate(){
		// Establish check for if undefined search_textis okay
		var accept_undefined 
		if(this.props.current_state.search_status === 'VALID') {accept_undefined = (this.props.current_state.search_text.toString() !== this.props.match.params.search_text)} 
		else {
			accept_undefined = (!['', undefined].includes(this.props.match.params.search_text))
		}
		// Check to see if the URL is different from the current state
		if (this.props.match.params.search_type !== this.props.current_state.search_type || accept_undefined) {
		const prior = this.state.prior_state
		const current = this.props.current_state
		// Gets hit if the change was driven by redux state rather than the URL
		if (prior['search_status']!==current['search_status'] || prior['search_type']!==current['search_type'] || prior['search_text']!==current['search_text'] ) {
		if (this.props.history.location.pathname !== '/searchby/'+this.props.current_state.search_type+'/'+this.props.current_state.search_text && this.props.current_state.search_status === 'VALID') {
		this.props.history.push('/searchby/'+this.props.current_state.search_type+'/'+this.props.current_state.search_text)}
		else if (this.props.current_state.search_status === 'INVALID') {
			this.props.history.push('/searchby/'+this.props.current_state.search_type)}
		this.setState({prior_state:this.props.current_state})
		}

		// Gets hit if the change was driven by URL change, adjusts the state accordingly
		else {
			var valid_search = SearchStatus.VALID
			var url_state = this.props.match.params
			if (url_state['search_text']===undefined || url_state['search_text']==='') {
				url_state['search_text'] = ''
				valid_search = SearchStatus.INVALID
			}
			this.setState({prior_state:{...url_state, search_status: valid_search, user_alerted:this.props.current_state['user_alerted']}})
			this.props.setStatetoURL({...url_state, search_status: valid_search, user_alerted:this.props.current_state['user_alerted']})
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