import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default, // Might want to change this if desired
    },
  },
});

// This is the function that will fetch the desired data from the api
const API = 'http://35.188.130.122/api/v0/courses/';
// const API_Test = 'https://hn.algolia.com/api/v1/search?query=redux';

class Fig1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], uuid: props.uuid, info: {} };
  }

  componentDidMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API + this.state.uuid + '/figure1')
      .then(response => response.json())
      .then(data =>
        this.setState({ info: data.result, data: data.result.instructors })
      );
  }

  render() {
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

    return <MyTable rows={table_data} info={info} />;
  }
}

//This is the function to create the table for figure 1
function CustomizedTable(props) {
  const { classes } = props;
  const rows = props.rows;
  const info = props.info;

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', fontSize: '3.5em', padding: '0.75em' }}>
        {' '}
        {info['dept name']}
        {info['course number']}: {info['course name']}{' '}
      </h1>
      <h2 style={{ padding: '0.5em', paddingTop: '0em' }}>
        {' '}
        These professors have taught the course in the past 3 years{' '}
      </h2>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell
                style={{ fontWeight: 'bold', fontSize: '1.2em' }}
              >
                Instructor Name
              </CustomTableCell>
              <CustomTableCell
                style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                align="right"
              >
                Average Instructor Rating (0-5)
              </CustomTableCell>
              <CustomTableCell
                style={{ fontWeight: 'bold', fontSize: '1.2em' }}
                align="right"
              >
                Instructor Rating in Course (0-5)
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
              <TableRow className={classes.name} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
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
    </div>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
// export default withStyles(styles)(CustomizedTable);
export default Fig1;
