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
import CourseChip from './CourseChip.js';
import obj from '../MobileTools.js';
import lists from '../../course_instructor_list.json';
import { connect } from 'react-redux';
import { setSearchType, setSearchText } from '../../actions';

// Get instructor lists
const instructor_list = lists['instructors'];

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
    padding: table_padding * theme.spacing.unit,
    paddingTop: 0.5 * table_padding * theme.spacing.unit,
    paddingBottom: 0.5 * table_padding * theme.spacing.unit,
  },
  body: {
    padding: table_padding * theme.spacing.unit,
    paddingTop: 0.5 * table_padding * theme.spacing.unit,
    paddingBottom: 0.5 * table_padding * theme.spacing.unit,
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
    padding: theme.spacing.unit,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default, // Might want to change this if desired
    },
    '&:hover': {
      backgroundColor: '#f3b7b7',
    },
  },
});

// This is the function that will fetch the desired data from the api
const API = api_endpoint + 'courses/';
// const API_Test = 'https://hn.algolia.com/api/v1/search?query=redux';

class CourseFig1Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], uuid: props.uuid, info: {}, loadedAPI: false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API + this.state.uuid + '/figure1')
      .then(response => response.json())
      .then(data =>
        this.setState({
          info: data.result,
          data: data.result.instructors,
          loadedAPI: true,
        })
      );
  }

  handleClick(event, id, child_state) {
    var clicked = child_state.rows[id - 1]['name'];
    // Convert instructor list to dict/hash
    var instr_dict = instructor_list.reduce((obj, item) => {
      obj[item['label'].toString()] = item['value'];
      return obj;
    }, {});
    // Get the instr uuid from the course dict
    var instr_uuid = instr_dict[clicked];
    if (typeof instr_uuid != 'undefined') {
      // Now just need to pass to redux to trigger redux state change
      this.props.setSearchType('INSTRUCTOR');
      this.props.setSearchText(instr_uuid);
    }
  }

  render() {
    if (!this.state.loadedAPI) {
      return null;
    } else {
      let MyTable = withStyles(styles)(CustomizedTable); // This is important
      // Get the data to pass to the table
      var table_data = this.state.data;
      table_data.forEach((item, i) => {
        item['crs rating'] = item['crs rating'].toFixed(2); // Convert the long floats to 2 decimal places
        item['avg rating'] = item['avg rating'].toFixed(2);
        item['id'] = i + 1;
      });

      // Get the info to pass to the table
      const info = this.state.info;

      return (
        <MyTable rows={table_data} info={info} handleClick={this.handleClick} />
      );
    }
  }
}

//This is the component for Figure1
class CustomizedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { classes: props.classes, info: props.info, rows: props.rows };
  }

  render() {
    const info = this.state.info;
    const classes = this.state.classes;
    const rows = this.state.rows;

    return (
      <div>
        <h1 className="title">
          {' '}
          {info['dept name']}
          {info['course number']}: {info['course name']}{' '}
        </h1>
        <CourseChip cnum={info['course number']} />
        <h2 className="subtitle">
          {' '}
          These professors have taught the course recently{' '}
        </h2>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className="table-header">
              <TableRow className={classes.tableRow}>
                <CustomTableCell align="left">Instructor Name</CustomTableCell>
                <CustomTableCell align="center">
                  Average Instructor Rating (1-5)
                </CustomTableCell>
                <CustomTableCell align="center">
                  Instructor Rating in Course (1-5)
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
                      this.props.handleClick(event, row.id, this.state)
                    }
                  >
                    {row.name}
                  </CustomTableCellHyperlink>
                  <CustomTableCell align="center">
                    {row['avg rating']}
                  </CustomTableCell>
                  <CustomTableCell align="center">
                    {row['crs rating']}
                  </CustomTableCell>
                  <CustomTableCell align="right">{row['term']}</CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <h5 className="footnote">
          {' '}
          * Click an instructor's name to navigate to their ratings{' '}
        </h5>
      </div>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  null,
  { setSearchType, setSearchText }
)(CourseFig1Table);
