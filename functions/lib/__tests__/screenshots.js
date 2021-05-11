const current = require('../screenshots.js');

describe('lib/screenshots.js', () => {
  describe('parseRequest', () => {
    it.each([
      [
        'Nominal case',
        {
          path: '/screenshots/http/www.pixelastic.com/',
        },
        {
          targetUrl: 'http://pixelastic.com',
        },
      ],
      [
        'https',
        {
          path: '/screenshots/https/www.pixelastic.com/',
        },
        {
          targetUrl: 'https://pixelastic.com',
        },
      ],
      [
        'With a query string',
        {
          path: '/screenshots/https/www.pixelastic.com',
          queryStringParameters: { sort: 'asc', query: 'tim' },
        },
        {
          targetUrl: 'https://pixelastic.com/?query=tim&sort=asc',
        },
      ],
      [
        'Revving',
        {
          path: '/screenshots/revv:abcdef01/http/www.pixelastic.com/',
        },
        {
          targetUrl: 'http://pixelastic.com',
          options: { revv: 'abcdef01' },
        },
      ],
      [
        'Custom args',
        {
          path: '/screenshots/width:600/cache:10d/http/www.pixelastic.com/',
        },
        {
          targetUrl: 'http://pixelastic.com',
          options: { width: '600', cache: '10d' },
        },
      ],
    ])('%s', async (_title, event, expected) => {
      const actual = current.parseRequest(event);
      expect(actual).toEqual(expect.objectContaining(expected));
    });
  });
});
