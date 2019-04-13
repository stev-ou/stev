import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import obj from '../MobileTools.js'

const mobile = obj['mobile']
var justify = 'left'
if (mobile){
  justify='center'

}

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: justify,
    flexWrap: 'wrap',
    paddingTop: '0.15em',
    paddingBottom: '0.55em',
  },

  chip: {
    margin: theme.spacing.unit,
    color: 'primary',
    fontSize: '1.2em',
  },
  palette: {
    primary: {
      main: '#4abcds',
    },
  },
  htmlTooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '20em',
    fontSize: theme.typography.pxToRem(14),
    border: '1px solid #dadde9',
    '& b': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
});

function CourseChip(props) {
  const { classes } = props;
  const first_char = props.cnum[0];

  // Define the chip label
  const label_dict = {
    1: 'Freshman',
    2: 'Sophomore',
    3: 'Junior',
    4: 'Senior',
    5: 'Graduate',
    6: 'Graduate',
    7: 'Graduate',
  };
  const bg_color_dict = {
    1: '#40BF42',
    2: '#ba68c8',
    3: '#439ad2',
    4: '#697689',
    5: '#bf4840',
    6: '#bf4840',
    7: '#bf4840',
  };
  const tooltip_dict = {
    1: 'This course is typically taken by freshmen, or 1st year, students',
    2: 'This is typically a course for sophomore, or 2nd year, students',
    3: 'This course is typically enrolled in by junior, or 3rd year, students',
    4: 'This course is typically taken by senior, or 4th year, students',
    5: 'This course is designed for graduate-level students',
    6: 'This course is designed for graduate-level students',
    7: 'This course is designed for graduate-level students',
  };
  const label = label_dict[first_char];
  const bg_color = bg_color_dict[first_char];
  const tooltip = tooltip_dict[first_char];

  return (
    <div className='chip-container'>
    <div className={classes.root}>
      <Tooltip
        title={tooltip}
        classes={{
          popper: classes.htmlPopper,
          tooltip: classes.htmlTooltip,
        }}
        placement="right"
      >
        <Chip
          label={label}
          className={classes.chip}
          variant="outlined"
          style={{ color: '#ffffff', backgroundColor: bg_color }}
        />
      </Tooltip>
      </div>
    </div>
  );
}

CourseChip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseChip);
