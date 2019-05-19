# Contributing to STEV

Thank you for considering making contributions to the project! This document
contains a brief outline of the guidelines for contributing. If you have any
questions, feel free to drop us a line at
[contact@evals.info](mailto:contact@evals.info).


### Table of Contents

Contributing
  * [Bug Reporting](#bug-reporting)
  * [Suggesting Improvements](#suggesting-improvements)
  * [Pull Requests](#pull-requests)
  
Getting Started
  * [Getting Started](#getting-started)
  * [Design Overview](#design-overview)

## Bug Reporting
Our bug reports are handled via GitHub issues. Upon discovering a bug, open an
issue with the tag "bug" and provide the steps to reproduce. Feel free to
include recommendations to address the issue.

## Suggesting Improvements
Similar to bug reports, suggesting improvements or new features are also handled
via GitHub. In order to file a suggestion/enhancement, open an issue in
[GitHub](https://github.com/stev-ou/stev/issues)and assign the tag "enhancement". 

## Getting Started
The most involved form of contribution is adding to our source. If you have
sufficient experience to make meaningful additions, we would love to have your
help. This sort of contribution usually manifests in a pull request. In order to
successfully modify our source and complete a pull request, you must first fork,
then clone this repository. After obtaining a local copy of the source, follow
instructions in the README to build the application. Upon successfully building
the application, you can branch from master to implement a new feature or bug
fix and then open a pull request upon completion! 

## Design Overview
In order to provide a minimal foundation for understanding the source, here lies
a brief overview of the design of the application. The two main repositories are
`stev` and `stev-api`, which house the frontend and backend portions of our
application, respectively. The overall design is as follows: 
```
  MongoDB           Docker            Docker
   Atlas           Container         Container
+---------+       +---------+ HTTP  +----------+ HTTP 
| MongoDB | <---> | Backend | <---> | Frontend | ---> Users
+---------+       +---------+  API  +----------+
```
The frontend is a React application which relies on additional libraries for
various functionality. It relies heavily on Redux for controlling global state,
and also employs node libraries like
[ChartJS](https://www.npmjs.com/package/react-chartjs-2), [Material
UI](https://www.npmjs.com/package/@material-ui/core), and  [Bootstrap
Table](react-bootstrap-table-next) for React to create the figures, and [React
Router](https://www.npmjs.com/package/react-router-dom) to control routing
between pages. The majority of the frontend is written in ES6 and linted with a
utility called `prettier`. 

The backend is a Python service which creates a WSGI web server hosted behind
Gunicorn. 

In production, the frontend is bundled using Webpack and then served behind an
Nginx reverse-proxy. This is all containerized and the nginx/react app is
served from Google Cloud Run simply running an instance (or multiple instances)
of the frontend container. The backend is similarly packaged in a Docker image
(using a Python base image) and run using Google Cloud Run. 

## Pull Requests
Feature branches should branch from master. After implementing desired changes
in a new branch, open a pull request and our team will review the request. The PR must pass our
CI/CD pipeline in order to be merged into master. In order to prevent
unnecessary iterations, ensure all tests have run locally such that other
functionality can be debugged upon opening the PR. If a number of contributions
come from an individual, our admins will gladly make you a maintainer of
the project if there is mutual agreement. 
