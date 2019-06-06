import React from 'react';
import Loader from 'react-loader-spinner';
import obj from './MobileTools.js';
// Define mobile parameters
var em = obj['em'];

class WaitSpinner extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.show.bind(this)
    this.state = {unmounted:false,visibility : "hidden", wait: this.props.wait}
  }

  componentDidMount() {
    var that = this
    this.timer = 
        setTimeout(function() {
          console.log('waited')
          that.show()
        }, this.state.wait); }

  componentWillUnmount(){
    clearTimeout(this.timer)
    this.setState({unmounted:true})
  }
  show() {
      if (!this.state.unmounted) {
        this.setState({visibility: "visible"});
      }
    }
  render() {
        return (
            <div style={{visibility:this.state.visibility, textAlign: 'center'}}>
        <h4 style={{paddingBottom: 5*em}}> Please wait a moment for the data to load </h4>
        <Loader type="Circles" color="#00000" height={25*em} width={25*em}/>
        </div>
        )
    }
}

export default WaitSpinner;
