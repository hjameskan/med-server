#!/bin/bash

# load environment variables
export $(cat /opt/elasticbeanstalk/deployment/env | xargs)

# installing yarn on aws linux 2
curl -o- -L https://yarnpkg.com/install.sh | bash
source ~/.bashrc

# build the app
cd /var/app/current/
yarn

# no need to start the app, elastic beanstalk will do it for us
