# Contributing to STEV

Thank you for considering making contributions to the project! This document
contains a brief outline of the guidelines for contributing. If you have any
questions, feel free to drop us a line at
[contact@evals.info](mailto:contact@evals.info).


## Overview

Contributing
  * [Bug Reporting](#bug-reporting)
  * [Suggesting Improvements](#suggesting-improvements)
  * [Pull Requests](#pull-requests)
  
Getting Started
  * [Getting Started](#getting-started)
  * [Design Overview](#design-overview)

## Bug Reporting
Our bug reports are handled via GitHub issues. Upon discovering a bug, please open an
issue, tag it with the "bug" label, and provide the steps to reproduce. Feel free to
include recommendations to address the issue.

## Suggesting Improvements
Similar to bug reports, suggesting improvements or new features is also handled
via GitHub. In order to file a suggestion/enhancement, open an issue in
[GitHub](https://github.com/stev-ou/stev-api/issues) and assign the label "enhancement". 

## Getting Started
The most involved way to contribute is adding to our source code. If you have
sufficient experience to make meaningful additions, we would love to have your
help. This sort of contribution usually manifests in a pull request. In order to
successfully modify our source and complete a pull request, you must first fork,
then clone your forked repository. After obtaining a local copy of the source, follow
instructions in the README to build the application. Upon successfully building
the application, you can branch from master to implement a new feature or bug
fix. Once you have completed your desired changes and tested your code, open a pull 
request for others to review.

## Design Overview
In order to provide a minimal foundation for understanding the source, here lies
a brief overview of the design of the application. The two main repositories are
`stev` and `stev-api`, which house the frontend and backend portions of our
application, respectively. The overall design is as follows: 
```
  MongoDB           Docker            Docker
   Atlas           Container         Container
+---------+       +---------+ HTTPS  +----------+ HTTPS 
| MongoDB | <---> | Backend | <----> | Frontend | ----> Users
+---------+       +---------+  API   +----------+
```
The frontend is a React application which relies on additional libraries for
various functionality. It relies heavily on Redux for controlling global state,
and also employs node libraries like
[ChartJS](https://www.npmjs.com/package/react-chartjs-2), [Material
UI](https://www.npmjs.com/package/@material-ui/core), and  [Bootstrap
Table](react-bootstrap-table-next) for React to create the figures, and [React
Router](https://www.npmjs.com/package/react-router-dom) to control routing
between pages. The majority of the frontend is written in Javascript (ES6).

The backend is a Python service which creates a WSGI web server hosted behind
Gunicorn. 

In production, the frontend is bundled using Webpack and then served behind an
Nginx reverse-proxy. This is all containerized using docker, then Google Cloud Run 
serves an instance (or multiple instances) of the React+Nginx container. 
The backend is similarly packaged in a Docker image
(using a Python 3.6 base image) and similarly run using Google Cloud Run. 

## Pull Requests
Feature branches should branch from master. After implementing desired changes
in a new branch, open a pull request (PR) and the change will be run through our 
continuous integration pipeline before review by the team. In order to prevent
unnecessary iterations, ensure all tests have passed locally before opening the PR. 

If you make many relevant contributions to the STEV source code, we would be happy 
to welcome you as a project maintainer or administrator.
