# Build from same image as CircleCI
FROM cimg/node:14.17.0-browsers
WORKDIR /home/circleci/project

# Install dependencies
COPY \
  ./package.json \
  ./yarn.lock \
  ./
RUN yarn && yarn cache clean

# Copy files to container
# The actual files to be copied are defined in .dockerignore
COPY --chown=circleci . .
