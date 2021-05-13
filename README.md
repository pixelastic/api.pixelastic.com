# api.pixelastic.com

This repo holds the endpoints hosted on `api.pixelastic.com`. I expect to be the
main user of this API, but that won't prevent me from documenting it.

## /screenshots

The `/screenshots` endpoint takes a screenshot of the specified website and
returns an image.

The call itself can be passed to Cloudinary for caching, CDN and transformation.

`GET api.pixelastic.com/screenshots/www.pixelastic.com`

## Visual Regression Testing

The `/screenshots` endpoint is tested through visual regression testing.
Screenshots are taken through Puppetteer, and compared trough Jest
`toMatchImageSnapshot`.

Because there are slight rendering differences based on the OS running the
tests, reference screenshots taken on my dev laptop do not match test
screenshots taken by the CI. This results in failing builds on the CI.

By default, `yarn run test` skips visual regression tests, but `yarn run
test:visual` runs all tests, including visual regression ones. It does so
through a Docker container similar to the one used by CircleCI, to limit the
potential differences.

The setup is not trivial, so here is how it works. The main idea is that,
running `yarn run test:visual` will build a Docker image and run `yarn run test`
in it. There are a bunch of files involved, so here we go:

- `.circleci/config.yml` contains the CircleCI configuration, including the base
  image and command to run.
- `Dockerfile` contains the instructions to build the image. We start from the
  same image as the one used in CircleCI. We copy all needed files from the
  host, and we set their permissions to the same user as the one running the
  script in the host.
- `.dockerignore` contains the list of files allowed to be copied from the host
  to the container. We don't want to copy everything as there are too many files
  and it might take too long. We'd rather be conservative and only allow what is
  needed.
- `docker-compose.yml` is a wrapper used to build and run the image. It mounts
  the `./functions` folder in the container as the one in the host. That way,
  editing files in the host updates them in the container, and any screenshot
  diff written in the container is available in the host. It also mount the host
  `node_modules` in the container, allowing skipping the whole yarn install
  step.
- `./scripts/test-visual` reads the current host user and uid and pass them to
  docker compose so it can pass them to the Dockerfile


