import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { connect } from 'react-redux';
import { setSearchType } from '../actions';
import React from 'react';

class RadioSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: this.props.search_type };
  }

  handleChange(value, event) {
    this.props.setSearchType(value);
  }

  render() {
    return (
      <div className="d-flex flex-column" style={{ padding: '0.7em' , zIndex: 0}}>
        <ToggleButtonGroup
          type="radio"
          name="options"
          defaultValue={this.state.value}
          onChange={this.handleChange}
          style={{ position: 'sticky' }}
        >
          <ToggleButton
            type="radio"
            name="radio"
            variant="secondary"
            defaultChecked
            value={'COURSE'}
          >
            Course
          </ToggleButton>
          <ToggleButton
            type="radio"
            name="radio"
            variant="secondary"
            value={'INSTRUCTOR'}
          >
            Instructor
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    search_type: state.search_type,
  };
};

export default connect(
  mapStateToProps,
  { setSearchType }
)(RadioSelector);
