import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    paddingTop:'0.35em',
    paddingBottom: '0.55em'
  },
  chip: {
    margin: theme.spacing.unit,
    color: 'primary',
    fontSize: '1.2em'
  },
  palette: {
    primary: {
      main: '#4abcds',
    }}
});

function CourseChip(props) {
  const { classes } = props;
    console.log(props.cnum)
  const first_char = props.cnum[0]

  // Define the chip label
  const label_dict = {1: 'Freshman', 2:'Sophomore', 3:'Junior', 4:'Senior', 5:'Graduate', 6:'Graduate', 7:'Graduate'}
  const bg_color_dict = {1: '#40BF42', 2:'#ba68c8', 3:'#439ad2', 4:'#697689', 5:'#bf4840', 6:'#bf4840', 7:'#bf4840'}
  const tooltip_dict = {1: 'This course is typically taken by freshmen, or 1st year, students.',
2: 'This is typically a course for sophomore, or 2nd year, students.',
3: 'This course is typically enrolled in by junior, or 3rd year, students.',
4: 'This course is typically taken by senior, or 4th year, students.',
5: 'This course is designed for graduate-level students.',
6: 'This course is designed for graduate-level students.',
7: 'This course is designed for graduate-level students.'}
  const label = label_dict[first_char]
  const bg_color = bg_color_dict[first_char]
  const tooltip = tooltip_dict[first_char]

  return (
    <div className={classes.root}>
    <Tooltip title={tooltip} placement="right" style={{fontSize: '5em'}}>
      <Chip label={label} className={classes.chip} variant='outlined' style={{color: '#ffffff', backgroundColor: bg_color}}/>
    </Tooltip>
    </div>
  );
}

CourseChip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseChip);