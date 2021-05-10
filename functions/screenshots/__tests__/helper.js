const current = require('../helper.js');

describe('screenshots helper', () => {
  describe('parseRequest', () => {
    it.each([
      [
        'Nominal case',
        {
          path: '/screenshots/http/www.pixelastic.com/',
        },
        'http://pixelastic.com',
      ],
      [
        'https',
        {
          path: '/screenshots/https/www.pixelastic.com/',
        },
        'https://pixelastic.com',
      ],
      [
        'With a query string',
        {
          path: '/screenshots/https/www.pixelastic.com',
          queryStringParameters: { sort: 'asc', query: 'tim' },
        },
        'https://pixelastic.com/?query=tim&sort=asc',
      ],
    ])('%s', async (_title, event, expected) => {
      const { targetUrl } = current.parseRequest(event);
      expect(targetUrl).toEqual(expected);
    });
  });
});
