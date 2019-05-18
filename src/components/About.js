import React from 'react';
import '../App.css';

class About extends React.Component {
  render() {
    return (
      <div className='container'>
      <div className='dataview-container'>
        <h2 style={{marginBottom: '0.75em'}}>
        <b>About the Project</b>
        </h2>
        <h3>
        Purpose
        </h3>
        <p>
        Students at the University of Oklahoma (OU) want the best education possible, which means enrolling in quality courses taught by competent and passionate instructors. 
        To assess the course offerings prior to enrollment, students typically turn to third-party resources, such as <a href='https://www.ratemyprofessors.com'>Rate My Professor</a>.
        These external services lack adequate reviews for many professors while representing only the students who took the time to contribute a response - typically, these are the students who either loved or hated a course or instructor.
        With these external tools as the only option, students at OU are forced to either: enroll in courses with inadequate prior knowledge of the course quality, or base their enrollment decisions on highly-biased evaluations. 
        We started this project to provide a superior alternative to these unappealing options.
        </p>
        <h3>
        Project Goal
        </h3>
        <p>
        We wanted to provide a visualization of course reviews that are <i>validated</i>, <i>extensive</i>, and <i>representative</i> of the enrolled students.
        Fortunately, verified student evaluations of teaching are administered through OU at <i>eval.ou.edu</i> at the end of each term. These evaluations are stored by the University and used by departments to analyze their programs and course-instructor matching.
        We believe students at OU should have a right to this information, and have built this website to offer functional, actionable views of the OU course evaluation data. 
        <a id='SETresearch'>We</a> hope that students will use these evaluations as they plan their courses at OU, and have received unanimous approval from the OU <a href = "http://www.ou.edu/content/dam/sga/common/USG/Minutes/Session%20102/Congress%20Minutes%2004-23-19.pdf#page=5">Undergraduate Student Congress</a> attesting to the student interest in and support for this project.
        </p>
        <h3 >
        Research on Student-Teacher Evaluations
        </h3>
        <p>
        Many research efforts have examined the efficacy, utility, and validity of student teacher evaluations, also known as student evaluations of teaching (SETs). 
        Results are mixed, with <a href = "https://link.springer.com/chapter/10.1007/1-4020-5742-3_9">some groups</a> arguing SETs provide necessary assessment of education from the student perspective, and <a href = "https://www.aaup.org/article/student-evaluations-teaching-are-not-valid#.XOBvpNNKiRt">others</a> contending that biases within the dataset overwhelm any useful conclusions.
        Specifically, SETs have exhibited biases against <a href = "https://academic.oup.com/jeea/article/17/2/535/4850534">female and minority instructors</a>, and substantial differences have been found between SETs from <a href = "https://doi.org/10.1080/13636820500507708">required versus elective</a> courses.
        While acknowledging these shortcomings, public universities like OU administer SETs for internal use and evaluation; we believe that if colleges use these course evaluations as a factor in their decision-making process, students should be able to use them similarly. 
        Courts in <a href="https://splc.org/2010/08/access-to-faculty-and-other-state-employee-evaluations/">Wisconsin</a> and <a href= "https://ballotpedia.org/Faculty_evaluations_and_public_records">other states</a> have come to similar conclusions, and some states now mandate that evaluations of public university officials and courses are available to students.
        Many colleges have built tools to permit student use of aggregated and anonymized student reviews: for example, <a href = "http://culpa.info/">CULPA</a> at Columbia University, <a href="https://it.wisc.edu/services/aefis/">AEFIS</a> at the University of Wisconsin, and <a href="https://accessuh.uh.edu/login.php">AccessUH</a> at the University of Houston allow students to access evaluations. 
        Currently, the OU internal reviews are <a href = "https://www.ou.edu/provost/course-evaluation-data">available publicly</a>, but are stored in vast collections of PDF files and are extremely difficult to access or draw insights from.
        We started this project from the belief that students at OU would benefit from a similar tool to access SET information, search for their content of interest, and draw valuable conclusions to advise their enrollment decisions.
        </p>
        For further research about the effectiveness and validity of SETs, please see the following sources:
        <br/>
        <ul>
        <li style={{paddingTop: '0.5em'}}><a href = "https://www.dom.edu/sites/default/files/pdfs/about/OIE/About_OIE_Course_Evaluation_Literature_Review.pdf">Online Course Evaluation - Literature Review and Findings, J. Wode (2011)</a>
        </li>
        <li><a href = "https://onlinelibrary.wiley.com/doi/abs/10.1080/01411920701492043">The Influence of Grades, Workload, Expectations and Goals on Students' Evaluations of Teaching, R. Remedios (2013)</a>
        </li>
        <li><a href = "https://journals.sagepub.com/doi/full/10.3102/0034654313496870">On the Validity of Student Evaluation of Teaching: The State of the Art, P. Spooren (2013)</a>
        </li>
        </ul>
        <i>* Many referenced articles require subscription to access, but can be viewed through the OU WIFI.</i>
        </div>
        <h3>
        Contact
        </h3>
        <p>
        If you would like to get in touch with the students leading this project, please send us an email at <a href = "mailto:contact@evals.info">contact@evals.info</a>.
        </p>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    );
  }
}

export default About;
