# STEV 

Student-Teacher Evaulutaion Visualization -> "Steve"  

A project to create a better data visualization for anonymous student reviews of professors/courses/departments at the University of Oklahoma. The reviews are currently available in individual, non-queryable pdfs (a collection of thousands of pdfs) at the following website - http://www.ou.edu/provost/course-evaluation-data. We want to create a data visualization to present this information and make it accessible to students.  

Website is available [here](http://35.193.175.5).  

Api backend is available here [here](http://35.188.130.122/api/v0).  


## Frontend Repo

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Formatting (run from frontend root) [**will override**]
```bash
# commit before 
$ make pretty
# review changes
$ git diff 
```

In the project directory, you can run: **use yarn**
- To begin the development, run `npm start` or `yarn start`.
- To create a production bundle, use `npm run build` or `yarn build`.

## Prereq's
- run `npm install` to install deps

## Deploying

Manually:

```bash
$ docker build . -t samjett/ou-reviews
$ docker push samjett/ou-reviews:latest
$ docker run -d -p 3000:80 samjett/ou-reviews:latest
```

Now Makefile includes appropriate targets.
