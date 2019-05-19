import React from 'react';
import '../App.css';

const GetInvolved = props => (
  <div className="container">
    <div className="dataview-container">
      <h1 style={{ marginBottom: '.75em' }}>
        <b>Get Involved</b>
      </h1>
      <p>
        Thanks for your interest in contributing to the STEV project! There are a number of
        opportunities to contribute, no matter your skillset. Those with
        software development experience are encouraged to jump into the code and submit
        a pull request (more on that <a href="#pull-requests">below</a>). For those with non-technical backgrounds, there are still a number of ways to
        contribute to the project through sharing the website with other OU students, finding bugs,
        or suggesting content improvements. A recommended ways to get involved are listed below.{' '}
      </p>
      <h3>Current Contribution Suggestions</h3>
      <p>
        <i>Updated Summer 2019</i>
      </p>
      <ul>
        <li>
          <b>Sharing the Website:</b> The easiest way for you to contribute to and
          be a part of this project is to share the link with your friends and peers at OU. The more people 
          who are behind this project, the more support we will have in encouraging OU administrators to 
          provide more valuable datasets toward improving the website's features.
        </li>
        <li>
          <b>Bug Tracking:</b> If you discover a bug with the application, we
          would appreciate your feedback so the bug can be fixed. In order to
          report a bug, please create an issue on our{' '}
          <a target= "_blank" href="https://github.com/stev-ou/stev/issues">GitHub page</a>, including
          in the description the steps required to reproduce the unintented behavior.{' '}
        </li>
        <li>
          <b>Lack of Data:</b> If you notice a lack of data (you search for a course/instructor
          and it does not exist in our system), create an issue in the same way
          as above, including the data you expected and what you received (if
          any). This is especially valuable since our team has continually attempted to work
          with the university, with very little receptivity or
          action on the university's behalf. As we collect more information
          about the demand for missing evaluations, we gain further support for our
          efforts to gather more data from OU.
        </li>
        <li>
          <b>Suggesting Improvements:</b> If you have a suggestion for an improvement to the site, we
          encourage you to submit an issue on our{' '}
          <a target = "_blank" rel="noopener noreferrer" href="https://github.com/stev-ou">GitHub page</a> with the label
          "enhancement", where developers will be able to discuss and hopefully
          implement your request!
        </li>
        <li>
          <b>Source Code Contributions:</b> All source code is available online,
          hosted on <a rel="noopener noreferrer" target = "_blank" rel="noopener noreferrer" href="https://github.com/stev-ou">GitHub</a>. We also use
          GitHub for bug tracking, issues, and suggested improvements, as stated
          above. For those interested in contributing to the software development,
          we encourage you to browse the <i>issues</i> in the{' '}
          <a target = "_blank" rel="noopener noreferrer"  href="https://github.com/stev-ou/stev">frontend repository</a> and
          find an issue you would like to address. Our current team is small and
          we graciously welcome source contributions. For more information, see
          "Pull Requests" below.
        </li>
      </ul>
      <h3 id="pull-requests">Pull Requests</h3>
      <p>
        Our source code is hosted on GitHub, in the organization{' '}
        <a target = "_blank" rel="noopener noreferrer"  href="https://github.com/stev-ou">stev-ou</a>. In order to make
        contributions, first fork the repository, then clone to your local machine
        and build the site. The build instructions are included in the{' '}
        <a target = "_blank" rel="noopener noreferrer" href="https://github.com/stev-ou/stev/blob/master/README.md">
          README
        </a>{' '}
        of each repository. Please consult the{' '}
        <a target = "_blank" rel="noopener noreferrer" href="https://github.com/stev-ou/stev/blob/master/CONTRIBUTING.md">
          CONTRIBUTING.md
        </a>{' '}
        file for actionable details regarding contributing to our source. After
        creating a new branch and implementing your desired changes, open a pull
        request for review by our team. After passing the review, your contributions will be included in our source! If you make
        many relevant contributions to the STEV source code, we would be happy
        to welcome you as a project maintainer or administrator.
      </p>
      <h3>Contact</h3>
      If you would like to get in touch with the project team, please email us
      at <a target = "_blank" rel="noopener noreferrer"  href="mailto:contact@evals.info">contact@evals.info</a>.
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
);

export default GetInvolved;
