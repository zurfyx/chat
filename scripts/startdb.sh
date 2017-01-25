#!/bin/bash
# Starts MongoDB and Redis databases.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"

# Initializes a MongoDB database on project_root/data/db-data/
(
  mkdir -p "${DIR}/../data/db-data"
  mongod --dbpath "${DIR}/../data/db-data" &
)

# Initializes a Redis DB server on project_root/data/db-session/
(
  mkdir -p "${DIR}/../data/db-session"
  cd "${DIR}/../data/db-session/"
  redis-server &
)

# On exit script kill databases
trap 'killall mongod; killall redis-server; exit' SIGINT EXIT
while true; do read; done