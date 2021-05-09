const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });
const got = require('golgoth/got');
const port = process.env.NETLIFY_DEV_PORT;

describe('/screenshots/', () => {
  // Should update the netlify.toml so in dev I serve local files from html/dev
  // and not html/prod
  // Those files should have some stuff displayed
  //
  // I then query the /screenshot/ with a url to this local server
  // I will need to handle the localhost:XXXX stuff, which might not work
  // and I should expect the returned element to match what is expected
  // I might need to look at Jest snapshots for that
  it('should work', async () => {
    const url = `http://localhost:${port}/screenshots/http/localhost:${port}/`;
    const actual = await got(url, {
      responseType: 'buffer',
    });

    expect(actual.rawBody).toMatchImageSnapshot();
  }, 30000);
});
