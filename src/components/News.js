import React from 'react';

const News = props => (
  <div className="container">
    <div className="dataview-container justify-page">
      <h1 style={{ marginBottom: '0.75em' }}>
        <b>News</b>
      </h1>
      <h5><b>09/24/2019 - The Lost Ogle</b></h5>
      <a target='_blank' href='https://www.thelostogle.com/2019/09/24/ou-grads-create-rating-app-to-discreetly-trash-talk-professors/'>
          OU grads create rating app to discreetly trash-talk professors
         </a>
         <div style={{marginLeft:'2em'}}>
         <small >* The STEV team disagrees with this article; the reason we created this website is described in detail on our About page.</small>
         </div>
      <br />
      <h5><b>09/22/2019 - OU Daily</b></h5>
      <a target='_blank' href='http://www.oudaily.com/news/ou-graduates-create-new-app-to-show-instructor-evaluations-for/article_48b4d150-dd45-11e9-b042-576e83ad8549.html'>
      OU graduates create new app to show instructor evaluations for courses
      </a>
      <br />
      <br />
      <h5><b>04/24/2019 - OU Daily</b></h5>
      <a target='_blank' href='http://www.oudaily.com/news/undergraduate-student-congress-sees-resolutions-on-teacher-evaluations-collegiate-recovery/article_11fc825a-6650-11e9-88d9-27d2da2c3db0.html'>
      Undergraduate Student Congress sees resolutions on teacher evaluations, collegiate recovery program in final meeting
         </a>
        <br />
      <hr></hr>
      
      The following article is not related to the STEV project, but provides some scope on OU's decision to publicize student evaluation data.
      <br />
      <br />
      <h5><b>12/11/2002 - OU Daily</b></h5>
      <a target='_blank' href='http://www.oudaily.com/students-need-access-to-evaluation-reports/article_e3f27c7c-c837-5409-a90a-334e9cc7a67f.html'>
      Undergraduate Student Congress sees resolutions on teacher evaluations, collegiate recovery program in final meeting
      </a>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
);

export default News;
