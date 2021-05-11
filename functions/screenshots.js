const helper = require('./lib/screenshots.js');

exports.handler = async (event, _content) => {
  const { targetUrl, options } = helper.parseRequest(event);
  const screenshot = await helper.getScreenshot(targetUrl);

  const headers = {
    'Content-Type': 'image/png',
    'X-Clacks-Overhead': 'GNU Terry Pratchett',
  };
  // Cache asset for 24h if a revv is passed
  if (options.revv) {
    headers['Cache-control'] = 'public, max-age=86400';
  }

  return {
    statusCode: 200,
    headers,
    body: screenshot.toString('base64'),
    isBase64Encoded: true,
  };
};
