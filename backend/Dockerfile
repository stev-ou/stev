FROM python:3.7-slim-stretch
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 5050
CMD gunicorn -w 4 -b 0.0.0.0:5050 server:app
