import React from 'react';
import { connect } from 'react-redux';
import { setSearchStatus, SearchStatus, setSearchType, setSearchText} from '../actions';

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
const api_endpoint = 'http://35.188.130.122/api/v0/';

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

    //alert('You entered: ' + this.state.search_type + ' ' + this.state.search_text);

      this.props.setSearchStatus(SearchStatus.VALID);
      this.props.setSearchText(this.state.search_text);
      this.props.setSearchType(this.state.search_type);

    event.preventDefault();
  }

  render() {
      return (
          <div className="row">
            <div className="col-lg-12">
      <form className="validate" onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
        <input
          className="form-control w-80 header-elem"
          name="search_text"
          type="text"
          placeholder="Enter Search Here"
          aria-label="Search"
          value={this.state.search_text}
          onChange={this.handleInputChange}
        />
        <div className="input-group-append">
        <input  type="submit" value="Submit" />
        </div>
        </div>


        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="MMERGE5" id="mce-MMERGE5-0" value="Course" checked="X"/>
          <label className="form-check-label">Course</label>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="MMERGE5" id="mce-MMERGE5-0" value="Instructor" checked=""/>
          <label className="form-check-label">Instructor</label>
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
    {setSearchStatus, setSearchText, setSearchType}
)(SearchForm);
