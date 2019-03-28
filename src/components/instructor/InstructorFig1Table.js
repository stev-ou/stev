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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#841617',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 18,
  },
}))(TableCell);

// This defines styles for the table
const styles = theme => ({
  root: {
    align: 'center',
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#f3b7b7!important',
    },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default, // Might want to change this if desired
    },
  },
  tableBody: {},
});

// This is the function that will fetch the desired data from the api
const API = api_endpoint + 'instructors/';

class InstructorFig1Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadedAPI: false, data: [], uuid: props.uuid };
  }

  componentDidMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API + this.state.uuid.toString() + '/figure1')
      .then(response => response.json())
      .then(data => this.setState({ data: data.result, loadedAPI: true }));
  }

  render() {
    if (!this.state.loadedAPI) {
      return null;
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
      return <MyTable data={table_data} />;
    }
  }
}

//This is the function to create the table for figure 1
function CustomizedTable(props) {
  const { classes } = props;
  const data = props.data;
  var rows = data.courses;

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', fontSize: '3.5em', padding: '0.75em' }}>
        {' '}
        {data['instructor name']}{' '}
      </h1>
      <h2 style={{ padding: '0.5em', paddingTop: '0em' }}>
        {' '}
        {data['instructor name'] +
          ' has taught these courses in the previous 3 years'}{' '}
      </h2>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableRow}>
              <CustomTableCell
                style={{ fontWeight: 'bold', fontSize: '1.2em' }}
              >
                Course Name
              </CustomTableCell>
              <CustomTableCell
                style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                align="right"
              >
                {data['instructor name']} Average Rating in Course (1-5)
              </CustomTableCell>
              <CustomTableCell
                style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                align="right"
              >
                Semester(s) Taught
              </CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow className={classes.tableRow} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row['display name']}
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
    </div>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
// export default withStyles(styles)(CustomizedTable);
export default InstructorFig1Table;
