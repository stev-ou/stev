import React from 'react';
import { connect } from 'react-redux';
import { SetSearchStatus, SearchStatus } from '../actions';

// API mapping, based on search type selected from the Header menu
const api_map = {
  course: 'courses/',
  department: 'department/',
  instructor: 'instructors/',
};
const api_arg_map = {
  course: '?course=',
  department: '?department=',
  instructor: '?instructor=',
};
const api_endpoint = 'http://localhost:5050/api/v0/';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search_type: 'course',
      search_text: '',
      result: {},
      valid_search: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    // Add an api query based on the input

    // Fetch the object from the api endpoint
    fetch(
      api_endpoint +
        api_map[this.state.search_type] +
        api_arg_map[this.state.search_type] +
        this.state.search_text
    )
      .then(response => response.json())
      .then(data => this.setState({ result: data.result, loadedAPI: true }));

    alert('You entered: ' + this.state.search_type + ' ');
    // console.log('Api response:')
    // console.log(this.state.result)
    //event.preventDefault();
  }

  render() {
    return (
      <form className="SearchForm" onSubmit={this.handleSubmit}>
        <label style={{ fontSize: '1em', fontStyle: 'bold' }}>
          <h4>Search by:</h4>
          <select
            name="search_type"
            id="search_type"
            style={{
              margin: '1em',
              marginTop: '0.1em',
              marginBottom: '0.1em',
              fontSize: '1.5em',
              textAlign: 'left',
              padding: '1.5em',
            }}
            value={this.state.search_type}
            onChange={this.handleInputChange}
          >
            <option className="search-option" value="instructor">
              Instructor
            </option>
            <option className="search-option" value="department">
              Department
            </option>
            <option className="search-option" value="course">
              Course
            </option>
          </select>
        </label>

        <input
          className="form-control w-80 header-elem"
          name="search_text"
          type="text"
          placeholder="Enter Search Here"
          aria-label="Search"
          value={this.state.search_text}
          onChange={this.handleInputChange}
        />
        <input className="header-elem" type="submit" value="Submit" />
      </form>
    );
  }
}

// read
// https://stackoverflow.com/questions/44668042/mapdispatchtoprops-with-react-redux-connect-and-class-components
// https://stackoverflow.com/questions/37661166/what-do-function-parameter-lists-inside-of-curly-braces-do-in-es6

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: () => dispatch(SetSearchStatus(SearchStatus.VALID)),
});

const mapStateToProps = state => {
  return {
    valid_search: state.valid_search,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchForm);
