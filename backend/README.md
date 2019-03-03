# Backend Repo

[![Build Status](https://travis-ci.com/samjett247/OU-Student-Reviews-DB.svg?token=SVpA8x2aEJENtpVkhC28&branch=master)](https://travis-ci.com/samjett247/OU-Student-Reviews-DB)

Included functionality:
- Flask server
- MongoDB interface
- Tests
- need to add more

## Getting Started

```bash
$ python3 -m venv env
$ source env/bin/activate
$ pip install -r requirements.txt
```

## Running Tests (incl. linting)

`make test`

## Deploying

Currently deploying using Docker.  
Ensure Docker is installed on your machine before continuing.  
Python WSGI application deployed behind Gunicorn.  
```bash
$ docker build . -t schuermannator/ou-reviews-api
$ docker run -p 5051:5050 schuermannator/ou-reviews-api:latest
$ docker push schuermannator/ou-reviews-api:latest
```
