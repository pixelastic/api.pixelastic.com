# Build from same image as CircleCI
FROM cimg/node:16.1.0-browsers

# Let Jest know that we should enable visual regression tests
ENV ENABLE_VISUAL_REGRESSION_TESTS=1
# Add colored output
ENV TERM=xterm-256color

# This is the workdir used by circleci by default
ARG WORKDIR=/home/circleci/project
WORKDIR ${WORKDIR}

# We create in the container a new user with the same name and uid as the user
# running the script (as defined by the HOST_USER and HOST_UID variables).
# This will make sure all files written by the container in shared folders will
# still be usable in the host
ARG HOST_USER
ARG HOST_UID
USER root
RUN useradd --create-home --uid ${HOST_UID} ${HOST_USER}
RUN chown -R ${HOST_USER}:${HOST_USER} ${WORKDIR}
USER ${HOST_USER}

# Install dependencies
# This steps make sure the dependencies are compiled exactly for the container,
# and not a copy of the host. But it is pretty slow, and need to be rerun
# everytime the content of package.json changes (version update, edit to the
# scripts, etc), so I've disabled it for now and simply sharing the node_modules
# through a shared folder
# COPY \
#   ./package.json \
#   ./yarn.lock \
#   ./
# RUN yarn && yarn cache clean

# Copy files to container
# The actual files to be copied are defined in .dockerignore
COPY --chown=${HOST_USER} . .


