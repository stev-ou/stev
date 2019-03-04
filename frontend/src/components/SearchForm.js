import React from 'react';
import { connect } from 'react-redux';
import {
  setSearchStatus,
  SearchStatus,
  setSearchType,
  setSearchText,
} from '../actions';
import { api_map, api_arg_map, api_endpoint } from '../constants.js';

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
      .then(response => {
        console.log('resp:');
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        console.log(data.result.length);
        this.setState({ result: data.result }, () => {
          console.log(this.state);
          if (data.result.length === 1) {
            this.props.setSearchStatus(SearchStatus.VALID);
            this.props.setSearchText(this.state.search_text);
            this.props.setSearchType(this.state.search_type);
            return this.setState({ result: data.result, valid_search: true });
          } else {
            alert(
              this.state.search_type +
                ' ' +
                this.state.search_text +
                ' not found!'
            );
            return this.setState({ valid_search: false });
          }
        });
      });

    event.preventDefault();
  }

  changeRadio(event) {
    console.log(event.target.value);
    if (event.target.value === 'Course') {
      //implement dispatch action to set type to course
    } else if (event.target.value === 'Instructor') {
      // NYE
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <form className="validate" onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <input
                className="form-control w-80 header-elem"
                id="landing-input"
                name="search_text"
                type="text"
                placeholder="Ex: ENGR1411"
                aria-label="Search"
                value={this.state.search_text}
                onChange={this.handleInputChange}
              />
              <div className="input-group-append">
                <input id="search-btn" type="submit" value="Search" />
              </div>
            </div>

            <div onChange={this.changeRadio.bind(this)}>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="search-type"
                  defaultChecked
                  value="Course"
                />
                <label className="form-check-label">Course</label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="search-type"
                  value="Instructor"
                />
                <label className="form-check-label">Instructor</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// read
// https://stackoverflow.com/questions/44668042/mapdispatchtoprops-with-react-redux-connect-and-class-components
// https://stackoverflow.com/questions/37661166/what-do-function-parameter-lists-inside-of-curly-braces-do-in-es6

//const mapDispatchToProps = (dispatch, ownProps) => ({
//  handleSubmit: () => dispatch(setSearchStatus(SearchStatus.VALID)),
//});

const mapStateToProps = state => {
  return {
    valid_search: state.valid_search,
  };
};

export default connect(
  mapStateToProps,
  { setSearchStatus, setSearchText, setSearchType }
)(SearchForm);
