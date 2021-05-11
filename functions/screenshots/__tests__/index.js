const got = require('golgoth/got');

describe.integration('/screenshots/', () => {
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
