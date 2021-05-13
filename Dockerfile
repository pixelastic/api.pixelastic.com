# Build from same image as CircleCI
FROM cimg/node:14.17.0-browsers

# This is the workdir used by circleci by default
ARG WORKDIR=/home/circleci/project
WORKDIR ${WORKDIR}

# We create a "host" user, that have the same UID as the user running the
# command in dev, and give it access to our workdir
# This will allow the container to write files that will be available in the
# host
# The actual uid will be overwritten by docker-compose
ARG HOST_UID=1000
USER root
RUN useradd --uid ${HOST_UID} host
RUN chown -R host:host ${WORKDIR}
USER host

# Install dependencies
COPY \
  ./package.json \
  ./yarn.lock \
  ./
RUN yarn && yarn cache clean

# Copy files to container
# The actual files to be copied are defined in .dockerignore
COPY --chown=host . .
