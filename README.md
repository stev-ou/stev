# ou_student_reviews_db
A project to create a better data visualization for anonymous student reviews of professors/courses/departments at the University of Oklahoma. The reviews are currently available in individual, non-queryable pdfs (a collection of ~730 pdfs) at the following website - http://www.ou.edu/provost/course-evaluation-data. We want to create a data visualization to present this information and make it accessible to students.

## Building  
Clone repo and make venv for python (assumes python 3.7.0) and install requirements  
```bash
$ python3 -m venv env  
$ source env/bin/activate
$ pip install -r requirements.txt
```

Right now, local development with mongodb (on x86-64 macOS)
```bash
$ brew update
$ brew install mongodb
```

It should already have a config file defined in `/usr/local/etc/mongod.conf`  
```
systemLog:
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /usr/local/var/mongodb
net:
  bindIp: 127.0.0.1
```

Then you can simply run local dev server with
```bash
$ mongod --config /usr/local/etc/mongod.conf
```

