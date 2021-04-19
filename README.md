# api.pixelastic.com

This repo holds the endpoints hosted on `api.pixelastic.com`. I expect to be the
main user of this API, but still plan on documenting it.

## /screenshots

The `/screenshots` endpoint takes a screenshot of the specified website and
returns an image.

The call itself can be passed to Cloudinary for caching, CDN and transformation.
