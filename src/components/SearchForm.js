import React from 'react';
import { connect } from 'react-redux';
import {
  setSearchStatus,
  SearchStatus,
  setSearchType,
  setSearchText,
  SearchType,
} from '../actions';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SearchAutocomplete from './SearchAutocomplete.js';
import RadioSelector from './RadioSelector.js';

// Class for tooltip
const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    textAlign: 'left',
    flexWrap: 'wrap',
    paddingTop: '0.05em',
    paddingBottom: '0.05em',
  },

  htmlTooltip: {
    textAlign: 'left',
    backgroundColor: 'rgba(245,245,249,1)',
    color: 'rgba(0, 0, 0, 1)',
    maxWidth: '18em',
    opacity: 1,
    fontSize: theme.typography.pxToRem(14),
    border: '2px solid #dadde9',
    '& b': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
});
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = props;
    this.state = {
      search_type: 'course',
      classes: classes, 
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
    const classes  = this.state.classes;
    return (
      <div className="row" style={{ zIndex: 2 }}>
        <div className="col-lg-12">
          <form onSubmit={this.handleSubmit}>
            {/*<div className="input-group mb-3">*/}
            <SearchAutocomplete
              className="w-100"
              value={this.state.search_text}
              onChange={this.handleInputChange}
              search_type={this.props.search_type}
            />
            <div className="form-check-inline" style={{'marginRight':'0px'}}>
              <h6 style={{ margin: '0px' }}> Search by: {'  '}</h6>
              <RadioSelector />
            </div>
            <div style={{display:'inline', float: 'right', marginTop: '0.1em'}}>
              <Tooltip 
              title={'Need help getting started? Try selecting Instructor and searching for "David Boren"'}
              leaveTouchDelay={1000}
              enterTouchDelay={0}
              classes={{
                tooltip: classes.htmlTooltip,
              }}
              placement='bottom-end'>
              <HelpOutlineIcon />
              </Tooltip>
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
)(withStyles(styles)(SearchForm));
