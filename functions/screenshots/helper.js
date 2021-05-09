const _ = require('golgoth/lodash');
const chromium = require('chrome-aws-lambda');

// TODO:
// Need to accept ?query strings and #hashes
// Need to accept passing custom args, like a unique hash for cache busting
// Need to deploy and test

module.exports = {
  async getScreenshot(url) {
    const executablePath = await chromium.executablePath;
    const { args } = chromium;
    const browser = await chromium.puppeteer.launch({
      executablePath,
      headless: true,
      args,
      defaultViewport: {
        deviceScaleFactor: 1,
        width: 1600,
        height: 900,
      },
    });

    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: ['load', 'networkidle0', 'domcontentloaded'],
    });

    const screenshot = await page.screenshot({ type: 'png' });
    await browser.close();
    return screenshot;
  },

  parseRequest(event) {
    const path = _.chain(event)
      .get('path')
      .replace('/screenshots/', '')
      .value();

    const regex = /^(?<protocol>https?)\/(?<url>.*)$/;
    const {
      groups: { protocol, url },
    } = regex.exec(path);

    const targetUrl = `${protocol}://${url}`;

    return {
      targetUrl,
    };
  },
};
