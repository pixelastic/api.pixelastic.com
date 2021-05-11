const got = require('golgoth/got');

describe.integration('/screenshots/', () => {
  const serverUrl = 'http://localhost:8888';
  it.each([
    [
      'Nominal case',
      `${serverUrl}/screenshots/`,
      `${serverUrl}/__tests__/screenshots/`,
    ],
    [
      'With query string',
      `${serverUrl}/screenshots/`,
      `${serverUrl}/__tests__/screenshots/?query=stuff&sort=asc`,
    ],
    [
      'Revved file',
      `${serverUrl}/screenshots/revv:abcdef01/`,
      `${serverUrl}/__tests__/screenshots/`,
    ],
  ])('%s', async (_title, apiUrl, targetUrl) => {
    const suffixUrl = targetUrl.replace('://', '/');
    const url = `${apiUrl}${suffixUrl}`;
    const actual = await got(url, {
      responseType: 'buffer',
    });

    const errorMessage = dedent`
      apiUrl:    ${apiUrl}
      targetUrl: ${targetUrl}
      url:       ${url}
    `;

    expect(actual.rawBody, errorMessage).toMatchImageSnapshot();
  });
});
