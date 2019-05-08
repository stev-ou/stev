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
		console.log(props)
		super(props)

		}
	componentDidMount(){
		const url_state = this.props.match.params
		const current_state = this.props.current_state
		
		// If state and URL different the first time the component mounts, take URL => State
		if (url_state.search_type !==undefined && url_state.search_text !== undefined) {
		this.props.setStatetoURL({...url_state, user_alerted:current_state['user_alerted']})}
		
		// Have to push the current location onto the history stack; Not sure why
		this.props.history.push(this.props.location.pathname)
	}
		// ROUTING
		// Check to see if props.history are the same as state
	componentDidUpdate(){

		// If component is just updating, then state => URL
		// console.log(this.props)
		// console.log(this.props.history.action)
		// Browser events come through as POP actions, whereas programmatic events are replace actions
		// If browser initiates, set state to new path
		if (this.props.history.action === 'POP'){
			console.log('POP ACTION')
			var url_state = this.props.match.params
			if (url_state['search_text']===undefined) {
				url_state['search_text'] = ''
			}
			this.props.setStatetoURL({...url_state, user_alerted:this.props.current_state['user_alerted']})
		}


		if (this.props.history.location.pathname !== '/searchby/'+this.props.current_state.search_type+'/'+this.props.current_state.search_text && this.props.current_state.search_status === 'VALID') {
		this.props.history.replace('/searchby/'+this.props.current_state.search_type+'/'+this.props.current_state.search_text)}
		else if (this.props.current_state.search_status === 'INVALID' && this.props.history.location.pathname !== '/searchby/'+this.props.current_state.search_type) {
			this.props.history.replace('/searchby/'+this.props.current_state.search_type)
		}


	}
		// const current_state = this.props.current_state
		// const url_state = this.props.history.location.pathname

		// const programmatic_change = (this.props.history.location.state.keys !== undefined)
		// console.log(this.props.history)
		// if (programmatic_change) {
		// console.log(this.props)
		// if (current_state['search_status']===SearchStatus.VALID) {
		// 	console.log(url_state)
		// 	if (url_state['search_type']!== current_state['search_type']|| url_state['search_text']!== current_state['search_text']) {
		// 		console.log('update')
		// 		console.log(this.props.current_state.search_type)
		// 		console.log(this.props.current_state.search_text)
		// 		this.props.history.push({path: '/searchby/'+this.props.current_state.search_type+'/'+this.props.current_state.search_text, state:{initiator: 'program'}})
		// 	}}

		// else {
		// 	if (url_state['search_type']!== current_state['search_type']) {
		// 		this.props.history.push('/searchby/'+this.props.current_state.search_type)
		// 	}}

		// }

		// else {
		// 	setStatetoURL({...url_state, user_alerted:current_state['user_alerted']})

		// }}
		// This is only deployed if a function is provided to the 
		// if (Object.keys(props.match.params).length>=2) {
		// 	const url_state = {...props.match.params, search_status:'VALID'}
		// 	console.log(current_state)
		// 	console.log(url_state)
		// 	if (url_state['search_type']!== undefined && url_state['search_text']!== undefined && this.props.history.location.pathname.length>0) {
		// 			if (['COURSE', 'INSTRUCTOR'].includes(this.props.search_type)) {
		// 				var append_string = '/searchby/'+this.props.search_type+'/'+this.props.search_text
		// 				this.props.history.push(append_string)
		// 			}

		// 		this.props.setStatetoURL({...url_state, user_alerted:current_state['user_alerted']})
		// 	}
		// 	else if (current_state['valid_search'] === SearchStatus.INVALID && this.props.history.location.pathname.length>0) {
		// 		this.props.setStatetoURL({...url_state, valid_search: SearchStatus.INVALID, user_alerted:current_state['user_alerted']})
		// 	this.props.history.push('/searchby/'+current_state['search_type'])}
		// }

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