import React from 'react';

const About = props => (
  <div className="container">
    <div className="dataview-container justify-page">
      <h1 style={{ marginBottom: '0.75em' }}>
        <b>About</b>
      </h1>
      <h3>Purpose</h3>
      <p>
        Students at the University of Oklahoma (OU) want the best education
        possible, which means enrolling in valuable courses taught by competent
        and passionate instructors. To assess the quality of courses prior to
        enrollment, students typically turn to third-party resources such as{' '}
        <a
          rel="noopener noreferrer"
          href="https://www.ratemyprofessors.com"
          target="_blank"
        >
          Rate My Professor
        </a>
        . For many instructors or courses, these external services lack adequate
        reviews. Even when data exists for a course or instructor, the data
        represents only students who took the time to respond - typically, these
        are the students who either loved or hated the course or instructor.
        With these external tools as the only option, students at OU are forced
        to either (i) enroll in courses with inadequate prior knowledge of the
        course quality, or (ii) base their enrollment decisions on highly-biased
        evaluations. We created this application to provide a superior
        alternative to these unappealing options.
      </p>
      <h3>Project Goal</h3>
      <p>
        Our goal is to provide a visualization of course reviews that are{' '}
        <i>validated</i>, <i>extensive</i>, and <i>representative</i> of the
        enrolled students. Fortunately, verified student evaluations of courses
        and instructors are administered through OU at <i>eval.ou.edu</i> at the
        end of each term. These evaluations are stored by the University and
        used by departments to analyze their programs and assess
        course-instructor matching. We believe students at OU have a right to
        this information, and have built this website to offer functional,
        actionable views of the OU course evaluation data. We hope that students
        will use these evaluations as they plan their courses at OU, and have
        received unanimous approval from the <span id="SETresearch">OU</span>{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="http://www.ou.edu/content/dam/sga/common/USG/Minutes/Session%20102/Congress%20Minutes%2004-23-19.pdf#page=5"
        >
          Undergraduate Student Congress
        </a>{' '}
        attesting to the student interest in and support for this project.
      </p>
      <h3>Research on Student-Teacher Evaluations</h3>
      <p>
        Many research efforts have examined the efficacy, utility, and validity
        of student teacher evaluations, also known as student evaluations of
        teaching (SETs). Results are mixed, with{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://link.springer.com/chapter/10.1007/1-4020-5742-3_9"
        >
          some groups
        </a>{' '}
        arguing SETs provide necessary assessment of education from the student
        perspective, and{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.aaup.org/article/student-evaluations-teaching-are-not-valid#.XOBvpNNKiRt"
        >
          others
        </a>{' '}
        contending that biases within the dataset overwhelm any useful
        conclusions. Specifically, SETs have exhibited biases against{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://academic.oup.com/jeea/article/17/2/535/4850534"
        >
          female and minority instructors
        </a>
        , and substantial differences have been found between SETs from{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://doi.org/10.1080/13636820500507708"
        >
          required versus elective
        </a>{' '}
        courses. Despite the acknowledged shortcomings, perhaps the best
        conclusion regarding the utility of SETs is offered by{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://onlinelibrary.wiley.com/doi/abs/10.1080/01411920701492043"
        >
          R. Remedios (2013)
        </a>
        :
      </p>
      <div className="quote">
        <p>
          <i>
            Overall, the results suggested that by far the largest determinant
            of student evaluation of courses is the quality of the teaching.
          </i>
        </p>
      </div>
      <p>
        Because of this value, public universities like OU administer SETs for
        internal evaluations of faculty and courses. We believe students should
        be able to similarly utilize these course evaluations as a factor in
        making their enrollment decisions. Courts in{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://splc.org/2010/08/access-to-faculty-and-other-state-employee-evaluations/"
        >
          Wisconsin
        </a>{' '}
        and{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://ballotpedia.org/Faculty_evaluations_and_public_records"
        >
          other states
        </a>{' '}
        have come to the same conclusion, with some states now mandating that
        evaluations of public university officials and courses be made available
        to students. In line with this sentiment, many colleges have built tools
        to permit student use of aggregated and anonymized collections of
        student reviews: for example,{' '}
        <a rel="noopener noreferrer" target="_blank" href="http://culpa.info/">
          CULPA
        </a>{' '}
        at Columbia University,{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://it.wisc.edu/services/aefis/"
        >
          AEFIS
        </a>{' '}
        at the University of Wisconsin, and{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://accessuh.uh.edu/login.php"
        >
          AccessUH
        </a>{' '}
        at the University of Houston. Currently, the OU internal reviews are
        made{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.ou.edu/provost/course-evaluation-data"
        >
          available to the public
        </a>
        , but are stored in vast collections of PDF files and are extremely
        difficult to access or draw insights from. We created this project from
        the belief that students at OU could benefit from a tool to access
        evaluation data, search for their content of interest, and draw valuable
        conclusions to advise their enrollment decisions.
      </p>
      For further research about the effectiveness and validity of SETs, please
      see the following sources:
      <br />
      <ul>
        <li style={{ paddingTop: '0.5em' }}>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.dom.edu/sites/default/files/pdfs/about/OIE/About_OIE_Course_Evaluation_Literature_Review.pdf"
          >
            Online Course Evaluation - Literature Review and Findings, J. Wode
            (2011)
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://link.springer.com/chapter/10.1007/1-4020-5742-3_5"
          >
            Identifying Exemplary Teachers and Teaching: Evidence from Student
            Ratings, K. Feldman (2007)
          </a>
        </li>
        <li>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://journals.sagepub.com/doi/full/10.3102/0034654313496870"
          >
            On the Validity of Student Evaluation of Teaching: The State of the
            Art, P. Spooren (2013)
          </a>
        </li>
      </ul>
      <p>
        <i>
          * Many referenced articles require subscription to access, but can be
          readily viewed on the OU WIFI.
        </i>
      </p>
      <h3>Contact</h3>
      <p>
        If you would like to get in touch with the project team, please email us
        at{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="mailto:contact@evals.info"
        >
          contact@evals.info
        </a>
        .
      </p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
);

export default About;
