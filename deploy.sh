#!/bin/bash

set -e
set -v
set -x

# docker build
make image

echo $DOCKER_PW | base64 --decode -i > ${HOME}/password.txt
cat ~/password.txt | docker login --username ${DOCKER_USERNAME} --password-stdin

echo $GCLOUD_SERVICE_KEY_NEW | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

echo "y" | gcloud auth configure-docker
docker push gcr.io/stev-ou/stev:latest

gcloud --quiet config set project $PROJECT_NAME
gcloud --quiet config set run/platform managed
gcloud --quiet config set run/region us-central1 

# update
# gcloud compute instances update-container stev-ou \
#       --container-image docker.io/samjett/stev-ou:latest

gcloud beta run deploy stev --image gcr.io/stev-ou/stev
