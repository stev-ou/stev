import React from 'react';
import ReactGA from 'react-ga';
import './App.css';
import Landing from './components/Landing.js';
import Header from './components/Header.js';
import { connect } from 'react-redux';
import { SearchType, setStatetoURL, SearchStatus, setCourseList, setInstructorList } from './actions';
import About from './components/About';
//import Footer from './components/Footer.js';
import GetInvolved from './components/GetInvolved';
import { api_endpoint } from './constants.js';

function initializeReactGA() {
  ReactGA.initialize('UA-138034707-1');
  ReactGA.pageview('/');
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { prior_state: this.props.current_state };
  }
  componentWillMount() {
    // Fetch the course list
      fetch(api_endpoint + 'courses/all')
      .then(response => response.json())
      .then(data => this.props.setCourseList(data.result))
    // Fetch the instructor list
      fetch(api_endpoint + 'instructors/all')
      .then(response => response.json())
      .then(data =>
        this.props.setInstructorList(data.result)
      );
  }
  componentDidMount() {
    const url_state = this.props.match.params;
    const current_state = this.props.current_state;

    // If state and URL different the first time the component mounts, take URL => State
    if (
      [SearchType.COURSE, SearchType.INSTRUCTOR].includes(url_state.search_type)
    ) {
      if (url_state.search_text !== undefined) {
        this.props.setStatetoURL({
          ...url_state,
          search_status: 'VALID',
          user_alerted: current_state['user_alerted'],
        });
      } else if (url_state.search_type !== undefined) {
        this.props.setStatetoURL({
          search_type: url_state['search_type'],
          search_status: 'INVALID',
          user_alerted: current_state['user_alerted'],
        });
      }
    }

    if (url_state.search_type === undefined) {
      this.props.history.push('/' + this.props.current_state.search_type);
    }
  }
  componentDidUpdate() {
    // ROUTING
    // Check to see if search_type is about or getinvolved
    if (
      ['about', 'getinvolved'].includes(this.props.match.params.search_type)
    ) {
      return;
    }
    // Establish check for if undefined search_textis okay
    var accept_undefined;
    if (this.props.current_state.search_status === 'VALID') {
      accept_undefined =
        this.props.current_state.search_text.toString() !==
        this.props.match.params.search_text;
    } else {
      accept_undefined = !['', undefined].includes(
        this.props.match.params.search_text
      );
    }
    // Check to see if the URL is different from the current state
    if (
      this.props.match.params.search_type !==
        this.props.current_state.search_type ||
      accept_undefined
    ) {
      const prior = this.state.prior_state;
      const current = this.props.current_state;
      // Gets hit if the change was driven by redux state rather than the URL
      if (
        prior['search_status'] !== current['search_status'] ||
        prior['search_type'] !== current['search_type'] ||
        prior['search_text'] !== current['search_text']
      ) {
        if (
          this.props.history.location.pathname !==
            '/' +
              this.props.current_state.search_type +
              '/' +
              this.props.current_state.search_text &&
          this.props.current_state.search_status === 'VALID'
        ) {
          this.props.history.push(
            '/' +
              this.props.current_state.search_type +
              '/' +
              this.props.current_state.search_text
          );
        } else if (this.props.current_state.search_status === 'INVALID') {
          this.props.history.push('/' + this.props.current_state.search_type);
        }
        this.setState({ prior_state: this.props.current_state });
      }

      // Gets hit if the change was driven by URL change, adjusts the state accordingly
      else {
        var valid_search = SearchStatus.VALID;
        var url_state = this.props.match.params;
        if (
          url_state['search_text'] === undefined ||
          url_state['search_text'] === ''
        ) {
          url_state['search_text'] = '';
          valid_search = SearchStatus.INVALID;
        }
        this.setState({
          prior_state: {
            ...url_state,
            search_status: valid_search,
            user_alerted: this.props.current_state['user_alerted'],
          },
        });
        this.props.setStatetoURL({
          ...url_state,
          search_status: valid_search,
          user_alerted: this.props.current_state['user_alerted'],
        });
      }
    }
  }

  render() {
    if (this.props.match.params.search_type === 'about') {
      return (
        <div>
          <Header history={this.props.history} />
          <About />
        </div>
      );
    } else if (this.props.match.params.search_type === 'getinvolved') {
      return (
        <div>
          <Header history={this.props.history} />
          <GetInvolved />
        </div>
      );
    } else {
      return (
        <div>
          <Header history={this.props.history} />
          <Landing history={this.props.history} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    current_state: {
      search_type: state.search_type,
      search_text: state.search_text,
      search_status: state.valid_search,
      user_alerted: state.user_alerted,
    },
  };
};

initializeReactGA();
export default connect(
  mapStateToProps,
  { setStatetoURL, setCourseList, setInstructorList}
)(App);
