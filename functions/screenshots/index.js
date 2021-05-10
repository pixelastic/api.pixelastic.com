const helper = require('./helper.js');

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
