#!/bin/bash

set -e
set -v
set -x

# docker build
make image

echo $DOCKER_PW | base64 --decode -i > ${HOME}/password.txt
cat ~/password.txt | docker login --username ${DOCKER_USERNAME} --password-stdin

docker push samjett/ou-reviews:latest
docker push samjett/ou-reviews-api:latest

echo $GCLOUD_SERVICE_KEY | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud --quiet config set project $PROJECT_NAME
gcloud --quiet config set compute/zone ${CLOUDSDK_COMPUTE_ZONE}

# update
gcloud compute instances update-container ou-reviews \
       --container-image docker.io/samjett/ou-reviews:latest

gcloud compute instances update-container api-server \
       --container-image docker.io/samjett/ou-reviews-api:latest
