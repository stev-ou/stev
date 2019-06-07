
import { connect } from 'react-redux';
import React  from 'react';
import Select from 'react-select-virtualized';
// import Select from 'react-select';
// import {components} from 'react-select'
import { SearchType } from '../actions';

class SearchAutocomplete extends React.Component {

  constructor(props) {
    super(props);
    var initial_state = {
      search_type: props.search_type,
      course_list: props.course_list,
      instructor_list: props.instructor_list,
    };
    this.state = initial_state;
  }

  componentDidUpdate(prevProps) {
    if (!(this.props.search_type === this.state.search_type)) {
      // Check if it's a new user, you can also use some unique property, like the ID 
      this.setState({ search_type: this.props.search_type });
    }
    if (this.state.course_list.length !== this.props.course_list.length || this.state.instructor_list.length !== this.props.instructor_list.length) {
      this.setState({course_list: this.props.course_list, instructor_list: this.props.instructor_list})
    }
  }

  render() {
    var choices;
    // Build a placeholder based on the search type
    var placeholder;
    if (this.props.search_type === SearchType.COURSE) {
      placeholder = 'Type a course name';
      choices = this.state.course_list

    } else {
      placeholder = 'Type an instructor name';
      choices = this.state.instructor_list
    }

    return (
      <div
        className="form-control w-80 header-elem"
        style={{ padding: '0em', border: 'None' }}
      >
        <Select
          className={'search-form'}
          options={choices}
          placeholder={placeholder}
          value={this.props.value}
          optionHeight={35}
          components={{
              Option: ({ innerRef,children, innerProps }) => (
              <div className={"custom-option"} ref={innerRef} {...innerProps}>
                {children}
              </div>
            )
          }}
          onChange={this.props.onChange}
          optionClassName={'custom-option'}
          styles={{
            control: (base) => ({ ...base, color: 'green' }),
            option: base => ({
              ...base,
              border: `1px dotted #00B8D9`,
              height: '100%',
              padding: '100px'
            }),
          }}
          autoFocus={true}
          menuIsOpen={true}
          defaultMenuIsOpen={true}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    course_list: state.course_list,
    instructor_list: state.instructor_list,
    search_type: state.search_type,
  };
};

export default connect(
  mapStateToProps,
  null
)(SearchAutocomplete);


