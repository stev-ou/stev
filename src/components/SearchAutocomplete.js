/* eslint-disable react/prop-types, react/jsx-handler-names */
import 'react-select-2/dist/css/react-select-2.css';
import './../SearchAutocomplete.css';
import { connect } from 'react-redux';
import React from 'react';
import Select from 'react-virtualized-select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { SearchType } from '../actions';

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      className={props.selectProps.classes.options}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer,
};

class SearchAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    var initial_state = {
      search_type: props.search_type,
      course_list: props.course_list,
      instructor_list: props.instructor_list,
    };
    this.state = initial_state;
  }

  componentDidUpdate(prevProps) {
    if (!(this.props.search_type === this.state.search_type)) {
      // Check if it's a new user, you can also use some unique property, like the ID 
      this.setState({ search_type: this.props.search_type });
    }
    if (this.state.course_list.length !== this.props.course_list.length || this.state.instructor_list.length !== this.props.instructor_list.length) {
      this.setState({course_list: this.props.course_list, instructor_list: this.props.instructor_list})
    }
  }

  render() {
    var choices = [];
    // Build a placeholder based on the search type
    var placeholder = '';
    if (this.props.search_type === SearchType.COURSE) {
      placeholder = 'Type a course name';
      choices = this.state.course_list

    } else {
      placeholder = 'Type an instructor name';
      choices = this.state.instructor_list
    }

    return (
      <div
        className="form-control w-80 header-elem"
        style={{ padding: '0em', border: 'None' }}
      >
        <Select
          className={'search-form'}
          options={choices}
          components={components}
          placeholder={placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          isClearable
          menuIsOpen
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    course_list: state.course_list,
    instructor_list: state.instructor_list,
    search_type: state.search_type,
  };
};

export default connect(
  mapStateToProps,
  null
)(SearchAutocomplete);


