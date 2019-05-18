# Contributing to STEV

Thank you for considering making contributions to the project! A brief outline
follows, in order to provide a brief foundation for contributions. If you have
any questions, feel free to drop us a line at
[contact@evals.info](mailto:contact@evals.info).


#### Table of Contents

Contributing
  * [Bug Reporting](#bug-reporting)
  * [Suggesting Improvements](#suggesting-improvements)
  * [Pull Requests](#pull-requests)
  
Getting Started
  * [Getting Started](#getting-started)
  * [Design Decisions](#design-decisions)

## Bug Reporting
Our bug reports are handled via GitHub issues. Upon discovering a bug, open an
issue with the tag "bug" and provide the steps to reproduce. 

## Suggesting Improvements
Similar to bug reports, suggesting improvements or new features are also handled
via GitHub. In order to file a suggestion/enhancement, open an issue in GitHub
and assign the tag "feature request". 

## Getting Started
The most involved form of contribution is adding to our source. If you have
sufficient experience to make meaningful additions, we would love to have your
help. This sort of contribution usually manifests in a pull request. In order to
successfully modify our source and complete a pull request, you must first fork,
then clone this repository. After obtaining a local copy of the source, follow
instructions in the README to build the application. Upon successfully building
the application, you can branch from master to implement a new feature or bug
fix and then open a pull request upon completion! 

## Design Decisions
In order to provide a minimal foundation for understanding the source, here lies
a brief overview of the design of the application. The two main repositories are
`stev` and `stev-api`, which house the frontend and backend portions of our
application, respectively. The overall design is as follows: 
```
Mongo Atlas        Container         Container
+---------+       +---------+ HTTP  +----------+ HTTP 
| MongoDB | <---> | Backend | <---> | Frontend | ---> Users
+---------+       +---------+  API  +----------+
```
The frontend is a React application which relies heavily on Redux and
React-Router. The majority of the frontend is written in ES6 and linted with a
utility called `prettier`. 

The backend is a Python service which creates a WSGI web server hosted behind
Gunicorn. 

In production, the frontend is bundled using Webpack and then served behind an
Nginx reverse-proxy. This is all containerized and the nginx/react app is
served from Google Cloud Run simply running an instance (or multiple instances)
of the frontend container. The backend is similarly packaged in a Docker image
(using a Python base image) and run using Google Cloud Run. 

## Pull Requests
Feature branches should branch from master. After implementing functionality,
open a pull request and our team will review the request. The PR must pass our
CI/CD pipeline in order to be merged into master. In order to prevent
unnecessary iterations, ensure all tests have run locally such that other
functionality can be debugged upon opening the PR. If a number of contributions
come from an individual, our admins will gladly make you a maintainer of
the project if there is mutual agreement. 
