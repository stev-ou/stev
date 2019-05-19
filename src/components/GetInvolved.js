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
      <p>Thanks for your interest in contributing to STEV! There are a number of opportunities to contribute, no matter your skillset. Those with engineering backgrounds are encouraged to jump into the code and submit a pull request (more on that <a href="#pull-requests">below</a>). If your background is non-technical, there are still a number of ways to contribute to the project through testing, gathering feedback, or suggesting improvements. A few recent challenges are listed here. </p>
      <h3>Current Contribution Suggestions</h3>
      <p><i>Updated Summer 2019</i></p>
      <ul>
        <li><b>Bug Tracking:</b> If you discover a bug with the application, we would appreciate your feedback so the bug can be fixed! In order to report a bug, create an issue on our <a href="https://github.com/stev-ou/stev/issues">GitHub</a> including the steps required to reproduce the unintented behavior. </li>
        <li><b>Lack of Data:</b> If you notice a lack of data (you search a course and it does not exist in our system), create an issue in the same way as above, including the data you expected and what you received (if any). This is especially valuable since our team has attempted to work with the university many times over, with very little receptiveness or action on the university's behalf. As we collect more information about the demand for missing evaluations, we will continue our attempts to gather more data from the university.</li>
        <li><b>Suggesting Improvements:</b> After playing with the application, we encourage you to submit an issue on our <a href="https://github.com/stev-ou">GitHub</a> with the label "enhancement", where developers will be able to discuss and hopefully implement your request!</li>
        <li><b>Source Code Contributions:</b> All source code is available online, hosted on <a href="https://github.com/stev-ou">GitHub</a>. We also use GitHub for bug tracking, issues, and suggested improvements as stated above. For those interested in contributing to software development, we encourage you to browse the *issues* in the [frontend repository](https://github.com/stev-ou/stev) and find an issue you would like to address. Our current team is small and we graciously welcome source contributions! For more information, see "Pull Requests" below.</li>
      </ul>
      <h3 id="pull-requests">Pull Requests</h3>
      <p>Our source code is hosted on GitHub, in the organization <a href="https://github.com/stev-ou">stev-ou</a>. In order to make contributions, first fork and clone our repository to your local machine and build the site. The build instructions are included in the <a href="https://github.com/stev-ou/stev/blob/master/README.md">README</a> of each repository. Please consult the <a href="https://github.com/stev-ou/stev/blob/master/CONTRIBUTING.md">CONTRIBUTING.md</a> file for actionable details regarding contributing to our source. After creating a new branch and implementing your desired changes, open a pull request for review by our team. After passing the review and our CI/CD pipeline, your contributions will be included in our source! If you make many relevant contributions to the STEV source code, we would be happy to welcome you as a project maintainer or administrator.</p>
      <h3>Contact</h3>
      If you would like to get in touch with the project team, please email us at <a href="mailto:contact@evals.info">contact@evals.info</a>.
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
