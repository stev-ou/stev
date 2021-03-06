import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { api_endpoint } from '../../constants.js';
import obj from '../MobileTools.js';
// import lists from '../../course_instructor_list.json';
import InstructorChips from './InstructorChips.js';
import { connect } from 'react-redux';
import { SearchType, setSearchType, setSearchText } from '../../actions';
import WaitSpinner from '../WaitSpinner';

// Define mobile parameters
var em = obj['em'];
var mobile = obj['mobile'];
var head_text_size = (em / 16).toString();
var table_padding = 3;
if (mobile) {
  head_text_size = (em / 6).toString();
  table_padding = 1.25;
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#841617',
    color: theme.palette.common.white,
    fontSize: head_text_size + 'rem',
    fontWeight: 'bold',
    padding: theme.spacing(table_padding),
    paddingTop: theme.spacing(0.5 * table_padding),
    paddingBottom: theme.spacing(0.5 * table_padding),
  },
  body: {
    padding: theme.spacing(table_padding),
    paddingTop: theme.spacing(0.5 * table_padding),
    paddingBottom: theme.spacing(0.5 * table_padding),
  },
}))(TableCell);

const CustomTableCellHyperlink = withStyles(theme => ({
  body: {
    '&:hover': {
      color: 'blue',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
}))(CustomTableCell);

// This defines styles for the table
const styles = theme => ({
  root: {
    align: 'center',
    width: '100%',
    overflowX: 'auto',
  },
  table: {},
  tableRow: {
    padding: theme.spacing(1),
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default, // Might want to change this if desired
    },
    '&:hover': {
      backgroundColor: '#f3b7b7',
    },
  },
});

// This is the function that will fetch the desired data from the api
const API = api_endpoint + 'instructors/';

class InstructorFig1Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedAPI: false,
      data: [],
      uuid: props.uuid,
      course_list: props.course_list,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API + this.state.uuid.toString() + '/figure1')
      .then(response => response.json())
      .then(data => this.setState({ data: data.result, loadedAPI: true }));
  }
  componentDidUpdate() {
    if (this.props.course_list.length !== this.state.course_list.length) {
      this.setState({ course_list: this.props.course_list });
    }
  }

  handleClick(event, id, child_state) {
    var clicked = child_state.rows[id - 1]['display name'];
    // Convert course list to dict/hash
    var course_list = this.state.course_list;
    var course_dict = course_list.reduce((obj, item) => {
      obj[item['label'].toString()] = item['value'].toString();
      return obj;
    }, {});
    // Get the course uuid from the course dict
    var course_uuid = course_dict[clicked];
    if (typeof course_uuid != 'undefined') {
      // Now just need to pass to redux to trigger redux state change
      this.props.setSearchType(SearchType.COURSE);
      this.props.setSearchText(course_uuid);
    }
  }

  render() {
    if (!this.state.loadedAPI || this.state.course_list.length === 0) {
      return <WaitSpinner wait={2000} />; // This controls how long to wait before displaying spinner
    } else {
      let MyTable = withStyles(styles)(CustomizedTable); // This is important
      // Get the data ready to pass to the table by rounding and adding ids
      var table_data = this.state.data;
      table_data.courses.forEach((item, i) => {
        item['instr_rating_in_course'] = item['instr_rating_in_course'].toFixed(
          2
        ); // Convert the long floats to 2 decimal places
        item['display name'] =
          item['dept name'] +
          item['course number'].toString() +
          ': ' +
          item['course name'];
        item['id'] = i + 1;
      });
      return (
        <MyTable
          uuid={this.state.uuid}
          data={table_data}
          handleClick={this.handleClick}
        />
      );
    }
  }
}

//This is the component for figure 1
class CustomizedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
      data: props.data,
      rows: props.data.courses,
      uuid: props.uuid,
    };
  }

  render() {
    const data = this.state.data;
    const classes = this.state.classes;
    const rows = this.state.rows;
    return (
      <div>
        <h1 className="title" style={{ paddingBottom: '0.5em' }}>
          {' '}
          {data['instructor name']}
        </h1>
        <InstructorChips uuid={this.state.uuid} />
        <h2 className="subtitle">
          {data['instructor name']} has taught these courses in the
          <b> previous 3 years</b>
        </h2>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.tableRow}>
                <CustomTableCell align="left">Course Name</CustomTableCell>
                <CustomTableCell align="center">
                  Average Course Rating (1-5)
                </CustomTableCell>
                <CustomTableCell align="center">
                  {data['instructor name']} Rating in Course (1-5)
                </CustomTableCell>
                <CustomTableCell align="right">
                  Semester(s) Taught
                </CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow className={classes.tableRow} key={row.id}>
                  <CustomTableCellHyperlink
                    component="th"
                    scope="row"
                    onClick={event =>
                      this.props.handleClick(
                        event,
                        row.id,
                        this.state,
                        this.props
                      )
                    }
                  >
                    {row['display name']}
                  </CustomTableCellHyperlink>
                  <CustomTableCell align="center">
                    {row['avg_course_rating'].toFixed(2).toString()}
                  </CustomTableCell>
                  <CustomTableCell align="center">
                    {row['instr_rating_in_course']}
                  </CustomTableCell>
                  <CustomTableCell align="right">{row['term']}</CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <h5 className="footnote">
          {' '}
          * Click a course name to navigate to its ratings{' '}
        </h5>
      </div>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStatetoProps = state => {
  return {
    course_list: state.course_list,
  };
};

export default connect(
  mapStatetoProps,
  { setSearchType, setSearchText }
)(InstructorFig1Table);
