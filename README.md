# api.pixelastic.com

This repo holds the endpoints hosted on `api.pixelastic.com`. I expect to be the
main user of this API, but that won't prevent me from documenting it.

## /screenshots

The `/screenshots` endpoint takes a screenshot of the specified website and
returns an image.

The call itself can be passed to Cloudinary for caching, CDN and transformation.

`GET api.pixelastic.com/screenshots/www.pixelastic.com`

## Development

Tests are separated in two kind: unit and integration tests.

- Unit tests are started with `yarn run test` and run quickly with Jest
- Integration tests are started with `yarn run test:integration` and fire
  a Docker container similar to the one used in the CI to start slower tests.


