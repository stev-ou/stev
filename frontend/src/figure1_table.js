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
      backgroundColor: theme.palette.background.default,
    },
  },
});


let id = 0;

function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

var rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

var new_rows = [
  createData('lil dicky aka bop bop', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbred', 356, 16.0, 49, 3.9),
];

// This is the function that will fetch the desired data from the api 
const API = 'http://localhost:5050/api/v0/courses/ame3440/figure1';
const DEFAULT_QUERY = '';
// const API = 'https://hn.algolia.com/api/v1/search?query=';
// const DEFAULT_QUERY = 'redux';

class Fig1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data:[]}

  }

  componentDidMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API+DEFAULT_QUERY)
    .then(response => response.json())
    .then(data => this.setState({data:data.result.instructors}));
  }

  render(){let MyTable = withStyles(styles)(CustomizedTable);
    // Get the data to pass to the table
    var table_data = this.state.data
    var i=0
    table_data.forEach((item, i) => {
      console.log(item)
        item['id'] = i + 1;
      });
    console.log(table_data)
    return(<MyTable rows={table_data} data={'temp'}/>)
  }
}

//This is the function to create the table for figure 1
function CustomizedTable(props) {

  const { classes } = props;
  console.log(props)
  const rows=props.rows
  const data = props.data
  // var data = 'nononfnsd'
  return (
    <div>
    <h1> These professors have taught the course in the past 2 years </h1>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Instructor Name</CustomTableCell>
            <CustomTableCell align="right">Average Rating (0-5)</CustomTableCell>
            <CustomTableCell align="right">Course Rating (0-5)</CustomTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.name} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right">{row['avg rating']}</CustomTableCell>
              <CustomTableCell align="right">{row['crs rating']}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <h1>
    {data}
    </h1>
    </div>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
// export default withStyles(styles)(CustomizedTable);
export default Fig1;