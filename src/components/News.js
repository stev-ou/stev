import React from 'react';

const News = props => (
  <div className="container">
    <div className="dataview-container justify-page">
      <h1 style={{ marginBottom: '0.75em' }}>
        <b>News</b>
      </h1>
      <h5><b>09/24/2019 - The Lost Ogle</b></h5>
      <li><a target='_blank' href='https://www.thelostogle.com/2019/09/24/ou-grads-create-rating-app-to-discreetly-trash-talk-professors/'>
          OU grads create rating app to discreetly trash-talk professors
         </a>
         </li> 
         <div style={{marginLeft:'2em'}}>
         <small >* It should be noted that the STEV team disagrees with the sentiment of this article. The reason we created this website is described in detail on the About page.</small>
         </div>
      <br />
      <h5><b>09/22/2019 - OU Daily</b></h5>
      <li><a target='_blank' href='http://www.oudaily.com/news/ou-graduates-create-new-app-to-show-instructor-evaluations-for/article_48b4d150-dd45-11e9-b042-576e83ad8549.html'>
         OU graduates create new app to show instructor evaluations for courses
         </a>
      </li>
      <br />
      <h5><b>04/24/2019 - OU Daily</b></h5>
      <li><a target='_blank' href='http://www.oudaily.com/news/ou-graduates-create-new-app-to-show-instructor-evaluations-for/article_48b4d150-dd45-11e9-b042-576e83ad8549.html'>
      Undergraduate Student Congress sees resolutions on teacher evaluations, collegiate recovery program in final meeting
         </a>
      </li>      
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
