# Upgrades server with the latest source code.
# Requirements:
# - A "git clone" of the repository (script will update it to the latest version)
# - Docker & Docker Compose
# ENV variables:
# - $PROJECT_FOLDER: script will browse into that folder first to do a git pull, docker-compose, ...
# - $SSH_USERNAME
# - $SSH_HOSTNAME
#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

(
  cd "$DIR/.." # Go to project dir.

  ssh $SSH_USERNAME@$SSH_HOSTNAME -o StrictHostKeyChecking=no <<-EOF
    cd $PROJECT_FOLDER
    git pull
    docker-compose pull
    docker-compose stop
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
    docker system prune -f
EOF
)