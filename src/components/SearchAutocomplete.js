/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import lists from '../course_instructor_list.json';
import './../App.css';

const course_list = lists['courses']
const instructor_list = lists['instructors']

const styles = theme => ({
  root: {
    flex: 1,
    flexWrap:'wrap'
    // height: 100,
  },
  input: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 0,
  },

  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflowWrap: 'break-word',
    overflow:'auto'
  },

  noOptionsMessage: {
    padding: '0px', //`${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  placeholder: {
    position: 'absolute',
    left: 1,
    fontSize: '0.9em',
  },
  options: {
    fontSize: '0.9em',
    display: 'flex',
    /// Lol this stupid ass thing wont wrap the text to the next line
    flexWrap:'wrap',
    flex: 1,
    overflowWrap: 'anywhere',
    overflow: 'auto'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});

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
      search_type: this.props.search_type,
    };
    if (this.props.search_type === 'COURSE') {
      initial_state['choices'] = course_list
    }
    else {
      initial_state['choices'] = instructor_list
    }
    this.state = initial_state
  }

  componentWillMount() {
    // Update the search list
    if (this.props.search_type === 'COURSE') {
      this.setState({choices: course_list})
    }
    else {
      this.setState({choices: instructor_list})
    }
  }

  componentDidUpdate(prevProps) {
    if (!(this.props.search_type === this.state.search_type)) {
      // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      this.setState({ search_type: this.props.search_type });
      this.componentWillMount();
    }
  }

  render() {
    var choices = this.state.choices;
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    // Build a placeholder based on the search type
    var placeholder = ''
    if (this.props.search_type === 'COURSE') {
      placeholder = 'Type a course name';
    } else {
      placeholder = "Type an instructor's name";
    }

    return (
      <div
        className="form-control w-80 header-elem"
        style={{ padding: '0em', paddingLeft: '0.1em' }}
      >
        <Select
          className={'search-form'}
          classes={classes}
          styles={selectStyles}
          options={choices}
          components={components}
          placeholder={placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          isClearable
        />
      </div>
    );
  }
}

SearchAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SearchAutocomplete);
