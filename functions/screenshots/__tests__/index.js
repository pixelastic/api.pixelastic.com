// TODO: Put toMatchImage in the setup file
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

// Netlify functions can only run for 10s
// TODO: Set tihs globally as well
jest.setTimeout(10000);

// TODO: Define this globally
const describeWithServer = process.env.NETLIFY_SERVER_RUNNING
  ? describe
  : () => {
      it('is skipped because it is an integration test', () => {
        expect(true).toBe(true);
      });
    };

const got = require('golgoth/got');

describeWithServer('/screenshots/', () => {
  it('should take a screenshot', async () => {
    const targetUrl =
      'http://localhost:8888/__tests__/screenshots/?query=stiff&sort=asc#anchor';

    const suffix = targetUrl.replace('://', '/');
    const url = `http://localhost:8888/screenshots/${suffix}`;
    const actual = await got(url, {
      responseType: 'buffer',
    });

    const errorMessage = dedent`
      targetUrl: ${targetUrl}
      url: ${url}
    `;

    expect(actual.rawBody, errorMessage).toMatchImageSnapshot();
  });
});
