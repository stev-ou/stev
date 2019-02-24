import React from 'react';
import './App.css';
import Fig1 from './components/figure1_table.js';
import Fig2 from './components/figure2_chart.js'

// API mapping, based on search type selected from the Header menu
const api_map = {'course':'courses/', 'department':'department/', 'instructor':'instructors/'}
const api_arg_map = {'course':'?course=', 'department': '?department=', 'instructor': '?instructor='}
const api_endpoint = "http://localhost:5050/api/v0/"

class Header extends React.Component {
  constructor(props) {
      super(props);
    };
  render(){
    return (
  <div className="App-header">
    <nav className="navbar sticky-top bg-dark">
      <div className='w-100 p-1 header_title'>
      <h1 className='header_title'>University of Oklahoma Course & Instructor Reviews</h1>
    </div>
      <div className = "header-container flex-md-nowrap w-80 p-1">
      <SearchForm/>
  </div>
    </nav>
  </div>);
  }
};


class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        search_type: 'course',
        search_text: '',
        result:{},
        valid_search: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // Add an api query based on the input

    // Fetch the object from the api endpoint
    fetch(api_endpoint+api_map[this.state.search_type]+api_arg_map[this.state.search_type]+this.state.search_text)
    .then(response => response.json())
    .then(data => this.setState({result:data.result, loadedAPI:true})); 


    alert('You entered: ' + this.state.search_type + " " );
    // console.log('Api response:')
    // console.log(this.state.result)
    //event.preventDefault();
  }

  render() {
    return (
      <form className="SearchForm" onSubmit={this.handleSubmit}>
        <label style={{'fontSize':'1em', 'fontStyle':'bold'}}>
          <h4>
          Search by:
          </h4>
          <select name='search_type' id='search_type' style={{'margin': '1em', 'marginTop': '0.1em','marginBottom':'0.1em', 'fontSize':'1.5em', 'textAlign':'left', 'padding':'1.5em'}} value={this.state.search_type} onChange={this.handleInputChange}>
            <option className = 'search-option' value="instructor">Instructor</option>
            <option className = 'search-option' value="department">Department</option>
            <option className = 'search-option' value="course">Course</option>
          </select>
        </label>

        <input className = "form-control w-80 header-elem" name='search_text' type="text" placeholder="Enter Search Here" aria-label="Search" value={this.state.search_text} onChange={this.handleInputChange} />
        <input className = 'header-elem' type="submit" value="Submit" />
      </form>
    );
  }
}

// consider converting to function
class Landing extends React.Component {
    constructor(props) {
       super(props);
    }

    render () {
        return (
            <div className="App">
                <div className="Info">
                    <p> Disclaimer: This website is not affiliated with nor approved by the University of Oklahoma. Its sole purpose is to inform students and prompt action against garbage-can professors whom require removal. There is no warranty nor any guaranetee on the validity of the data. Data is publicly available and ingested from the University's public releases. Thank you and have a good time.
                    </p>
                </div>
                <a
                    className="App-link"
                    href="https:\/\/www.ou.edu/provost/course-evaluation-data"
                    target="_blank"
                    rel="noopener noreferrer"
                >Link to data</a>
            </div>
        );
    }
}

class LandingController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {valid_search: false}
    }

    render() {
        const valid_search = this.state.valid_search;
        if (!valid_search) {
            return <Landing />
        }
        return <h1> This is where the timeserieschart would go. </h1>
    }
}

class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {valid_search: props.valid_search}
    }

  render() {
    // THIS DOESNT WORK. Need to figure out some way to get the data from Header -> SearchForm back up to the App level 
    //so that I can send it to the Fig1 and Fig2 components. For now, I have a temp uuid I'll pass

    // Heres some other options: "ame4442", "ame5720", "ame4970", "ame3523", "ame5903", 
    const temp_uuid = 'ame4970' 
  if (!this.state.valid_search){
    return (
        //<LandingController />
        <div>
        <Header/>
        <div className='graphical-content'>
        <div className='table-fig1'>
        <Fig1 uuid={temp_uuid}/>
        </div>
        </div>
        <Fig2 uuid={temp_uuid} />
        <Landing/>
        </div>
    );}
  else {
    return(
    <div>
    <Header/>
    <Landing/>
    </div>
    )
  }
}}

// <TimeSeriesChart data={new_data}/>

export default App;
