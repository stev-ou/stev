import React from 'react';
import { connect } from 'react-redux';
import {
  setSearchStatus,
  SearchStatus,
  setSearchType,
  setSearchText,
  SearchType,
} from '../actions';
import SearchAutocomplete from './SearchAutocomplete.js';

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

  handleSubmit(event) {
    this.props.setSearchStatus(SearchStatus.VALID);
    if (typeof event.value === 'string') {
      this.props.setSearchText(event.value.toLowerCase());
      return this.setState({
        result: event.value.toLowerCase(),
        valid_search: true,
      });
    }
    //this.props.setSearchType(this.state.search_type);
    this.props.setSearchText(event.value);
    return this.setState({ result: event.value, valid_search: true });
  }

  handleInputChange(event) {
    this.setState({
      search_text: event.value,
    });
    this.handleSubmit(event);
  }

  changeRadio(event) {
    if (event.target.value === 'Course') {
      this.props.setSearchType(SearchType.COURSE);
    } else if (event.target.value === 'Instructor') {
      this.props.setSearchType(SearchType.INSTRUCTOR);
    }
  }

  render() {
    // eslint-disable-next-line
    var prompt;
    if (this.props.search_type === SearchType.COURSE) {
      prompt = 'Ex: ENGR1411';
    } else {
      prompt = 'Ex: 112112705';
    }
    return (
      <div className="row">
        <div className="col-lg-12">
          <form className="validate" onSubmit={this.handleSubmit}>
            {/*<div className="input-group mb-3">*/}
            <SearchAutocomplete
              className="w-100"
              value={this.state.search_text}
              onChange={this.handleInputChange}
              search_type={this.props.search_type}
            />
            {/*</div>*/}

            <div onChange={this.changeRadio.bind(this)} >
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
    search_type: state.search_type,
  };
};

export default connect(
  mapStateToProps,
  { setSearchStatus, setSearchText, setSearchType }
)(SearchForm);
