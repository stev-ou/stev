#!/bin/bash

set -e
set -v
set -x

# docker build
cd frontend
make image
cd ../backend
make image

docker push schuermannator/ou-reviews:latest
docker push schuermannator/ou-reviews-api:latest

echo $GCLOUD_SERVICE_KEY | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud --quiet config set project $PROJECT_NAME
gcloud --quiet config set compute/zone ${CLOUDSDK_COMPUTE_ZONE}

# update
gcloud compute instances update-container ou-reviews \
       --container-image docker.io/schuermannator/ou-reviews:latest

gcloud compute instances update-container api-server \
       --container-image docker.io/schuermannator/ou-reviews-api:latest
