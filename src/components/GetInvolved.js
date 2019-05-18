import React from 'react';
import '../App.css';

/*
class GetInvolved extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentDidUpdate() {}

  render() {
    return (
      <div className="dataview-container">
        <h2>Get Involved</h2>
        <p>This page is currently under development.</p>
      </div>
    );
  }
}

<li><b> :</b> Poll for student opinion in an effort to gather feedback and observe usage patterns. Take Student Name, ID and an "I approve" box?Captcha?Enforce 1 submission/IP?</li>
*/

const GetInvolved = props => (
  <div className="container">
    <div className="dataview-container">
      <h1 style={{marginBottom: ".75em"}}><b>Get Involved</b></h1>
      <p>Thanks for your interest in contributing to STEV! As this project continues to grow, there are increasingly many opportunities for involvement. Those with engineering backgrounds are encouraged to jump into the code and submit a pull request (more on that <a href="#pull-requests">below</a>). No matter your background, there are a number of ways to contribute to the project. A few recent challenges are listed here. </p>
      <h3>Current Contribution Suggestions</h3>
      <p><i>Updated Spring 2019</i></p>
      <ul>
        <li><b>Bug Tracking:</b> Submit a bug you discovered! Or submit an issue regarding the lack of data. If you discover a bug, make sure to jot down the steps to reproduce and submit a bug report in the "Issues" tab on our <a href="https://github.com/stev-ou">GitHub</a>. The latter contribution is especially valuable since our team has attempted to work with the university many times over, with very little receptiveness or action on the university's behalf. As we collect more information about missing data, and the demand for rectifying it, we will continue our attempts to gather more data from the university.</li>
        <li><b>Suggesting Improvements:</b> After playing with the application, we encourage you to submit an issue on our <a href="https://github.com/stev-ou">GitHub</a> with the tag "Feature Request", where developers will be able to discuss and hopefully implement your request!</li>
        <li><b>Source Code Contributions:</b> All source code is available online, hosted on <a href="https://github.com/stev-ou">GitHub</a>. We also use GitHub for bug tracking, issues, and suggested improvements as stated above. For example, browse the issues for the frontend repository <a href="https://github.com/stev-ou/stev/issues">here</a>. For those with software development experience, we would love your help. Our current team is small and we graciously welcome source contributions! For more information, see "Pull Requests" below.</li>
      </ul>
      <h3 id="pull-requests">Pull Requests</h3>
      <p>Our source code is hosted on GitHub, in the organization <a href="https://github.com/stev-ou">stev-ou</a>. In order to make contributions, first fork and clone our repository to your local machine and build the site. The build instructions are included in the <a href="https://github.com/stev-ou/stev/blob/master/README.md">README</a> of each repository. Please consult the <a href="https://github.com/stev-ou/stev/blob/master/CONTRIBUTING.md">CONTRIBUTING.md</a> file for actionable details regarding contributing to our source. After creating a branch including your features/bug fixes, open a pull request for review by our team. After passing the review and our CI/CD pipeline, your contributions will be included in our source! If there are a number of contributions from an individual, we will happily welcome you as a maintainer of the project if interested.</p>
      <h3>Contact</h3>
      Reach our team for questions at <a href="mailto:contact@evals.info">contact@evals.info</a>.
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  </div>
);

export default GetInvolved;
