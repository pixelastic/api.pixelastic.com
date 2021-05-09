const helper = require('./helper.js');

// TODO:
// Need to accept ?query strings and #hashes
// Need to accept passing custom args, like a unique hash for cache busting
// Need to deploy and test

exports.handler = async (event, _content) => {
  const { targetUrl } = helper.parseRequest(event);
  const screenshot = await helper.getScreenshot(targetUrl);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
    },
    body: screenshot.toString('base64'),
    isBase64Encoded: true,
  };
};
