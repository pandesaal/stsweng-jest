#!/bin/bash

mkdir -p /home/runner/workspace/mongodb_data

mongod --dbpath /home/runner/workspace/mongodb_data --bind_ip 127.0.0.1 --logpath /home/runner/workspace/mongodb.log --fork

npm run dev
