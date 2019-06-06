import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import obj from '../MobileTools.js';
import { api_endpoint, dept_chip_colors } from '../../constants.js';

const mobile = obj['mobile'];
var justify = 'left';
var loc = 'right'
if (mobile) {
  justify = 'center';
  loc = 'bottom'
}

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: justify,
    textAlign: justify,
    flexWrap: 'wrap',
    paddingTop: '0.05em',
    paddingBottom: '0.05em',
  },

  chip: {
    margin: theme.spacing(1),
    color: 'primary',
    fontSize: '1.1em',
  },
  palette: {
    primary: {
      main: 'rgba(245,245,249,1)',
    },
  },
  htmlTooltip: {
    textAlign: justify,
    backgroundColor: 'rgba(245,245,249,1)',
    color: 'rgba(0, 0, 0, 1)',
    maxWidth: '24em',
    opacity:1,
    fontSize: theme.typography.pxToRem(14),
    border: '2px solid #dadde9',
    '& b': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
});
// This is the function that will fetch the desired data from the api
const API = api_endpoint + 'instructors/';

class InstructorChips extends React.Component {
  constructor(props) {
    super(props)
    //Define classes as props
    const {classes}=props
    this.state = {'data':{}, 'loadedAPI':false, 'classes':classes, 'uuid':props.uuid}
  }

  componentDidMount() {
    // This will call the api when the component "Mounts", i.e. when the page is accessed
    fetch(API + this.state.uuid.toString() + '/chip')
      .then(response => response.json())
      .then(data => this.setState({ data: data.result, loadedAPI: true }));
  }

  render() {
    if (!this.state.loadedAPI) {
      return null;
    } else {
    const data = this.state.data
    const classes =this.state.classes
  // YEARS CHIP DETAILS
  // Define the Number of Years Chip Label
  const bg_color_dict = {
    1: '#40BF42',
    2: '#ba68c8',
    3: '#439ad2',
    4: '#697689',
    5: '#6699CC',
    6: '#4E8098',
    7: '#FF8C42',
    8: '#5555F2',
    9: '#44C29A',
  };
  const years_color = years => {if (years<10) {
    return bg_color_dict[years]
  } else {
    return '#FF4E4E'
  }}
  const years = data['num_years']
  const y_label = years.toString()+' Years Teaching at OU'
  const y_color = years_color(years);
  const y_tooltip = 'According to our limited dataset, '+data['name']+' has taught at OU since '+data['most_recent_semester']+ '.'

  // DEPARTMENT CHIP DETAILS
  var depts_chips= [];
  var d;
  const depts = data['depts_taught']
  for (var i=0; i<depts.length;i++) {
    d = depts[i]
    depts_chips.push((<Tooltip leaveTouchDelay={1000} enterTouchDelay={0} title={data['name']+' has taught in the '+d+ ' department/subject.'} 
          classes={{
            popper: classes.htmlPopper,
            tooltip: classes.htmlTooltip,
          }}
          placement = {loc} key = {i.toString()}>
          <Chip
            label={d}
            className={classes.chip}
            variant="outlined"
            style={{ color: '#ffffff', backgroundColor: dept_chip_colors[d]}}
          />
        </Tooltip>))
  }

  return (
    <div>
    <div className="chip-container">
      <div className={classes.root}>
        <Tooltip
          leaveTouchDelay={1000}
          enterTouchDelay={0} 
          title={y_tooltip}
          classes={{
            popper: classes.htmlPopper,
            tooltip: classes.htmlTooltip,
          }}
          placement= {loc}
        >
          <Chip
            label={y_label}
            className={classes.chip}
            variant="outlined"
            style={{ color: '#ffffff', backgroundColor: y_color}}
          />
        </Tooltip>
        </div>
        </div>
        <div className="chip-container">
        <div className={classes.root}>
        {depts_chips}
        </div>
        </div>
      </div>
  );
}}}

InstructorChips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InstructorChips);
