import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';

const primary = red[500]; // #F44336
const accent = purple['A200']; // #E040FB
// const accent = purple.A200; // #E040FB (alternative method)

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    paddingTop:'0.2em',
    paddingBottom: '0.3em'
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
  const first_char = props.cnum.toString()[0]

  // Define the chip label
  const label_dict = {1: 'Freshman', 2:'Sophomore', 3:'Junior', 4:'Senior', 5:'Graduate', 6:'Graduate', 7:'Graduate'}
  const bg_color_dict = {1: '#37D67A', 2:'#ba68c8', 3:'#2CCCE4', 4:'#697689', 5:'#f47373', 6:'#f47373', 7:'#f47373'}
  const text_color_dict = {1: '#37D67A', 2:'#ba68c8', 3:'#2CCCE4', 4:'#697689', 5:'#f47373', 6:'#f47373', 7:'#f47373'}
  const label = label_dict[first_char]
  const bg_color = bg_color_dict[first_char]

  return (
    <div className={classes.root}>
      <Chip label={label} className={classes.chip} variant='outlined' style={{color: '#ffffff', backgroundColor: bg_color}}/>
    </div>
  );
}

CourseChip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseChip);