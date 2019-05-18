# STEV 
[![Build
Status](https://travis-ci.com/stev-ou/stev.svg?branch=master)](https://travis-ci.com/stev-ou/stev)  
Student-Teacher Evaluation Visualization -> "Steve"  

A project to create a better data visualization for anonymous student reviews of
professors/courses/departments at the University of Oklahoma. The reviews are
currently available in individual, non-queryable pdfs (a collection of thousands
of pdfs) at the following website -
http://www.ou.edu/provost/course-evaluation-data. We want to create a data
visualization to present this information and make it accessible to students.  

## Building

The application was bootstrapped with [Create React
App](https://github.com/facebook/create-react-app).
In order to build and run the application, ensure the following are installed:

```
GNU Make
Nodejs
npm
```

After cloning the repository, change directory into `stev` and run:

``` bash
$ make install
```

## Running

In the root directory, you can: 
- Begin development, with `npm start` or `yarn start`.
- Create a production bundle with `npm run build` or `yarn build`.

Navigate to `localhost:3000` to view the development server running the
application. 

## Available Scripts

The makefile includes some useful targets: 
**Pretty:** Formatting (run from frontend root) [**will override**]
```bash
# commit before 
$ make pretty
```

**Image:** Create a docker image
```bash
# REQUIRES DOCKER
$ make image
```

**Run:** Run a container of the entire frontend application
```bash
# REQUIRES DOCKER
$ make run
```

**Clean:** Remove the node_modules folder
```bash
$ make clean
```


