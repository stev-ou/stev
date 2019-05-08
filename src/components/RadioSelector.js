import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { connect } from 'react-redux';
import { setSearchType } from '../actions';
import React from 'react';

class RadioSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);}
  //   this.state = {value:this.props.search_type}
  // }
  // componentDidMount() {
  //   this.setState({ value: this.props.search_type })
  // }

  // componentWillUpdate() {
  //   console.log('RadioSelector Updated')
  //   console.log(this.props)
  //   // this.handleClick({value=this.props.search_type, event=[]})
  //   this.render()
  // }

  handleClick(value, event) {
    this.props.setSearchType(value);
  }

  render() {
    return (
      <div className="d-flex flex-column" style={{ padding: '0.7em' , zIndex: 0}}>
        <ToggleButtonGroup
          type="radio"
          name="options"
          value={this.props.search_type}
          onChange={this.handleClick}
          style={{ position: 'sticky' }}
        >
          <ToggleButton
            type="radio"
            name="radio"
            variant="secondary"
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
  return {
    search_type: state.search_type,
  };
};

export default connect(
  mapStateToProps,
  { setSearchType }
)(RadioSelector);
