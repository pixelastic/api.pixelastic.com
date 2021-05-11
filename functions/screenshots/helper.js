const _ = require('golgoth/lodash');
const chromium = require('chrome-aws-lambda');
const normalizeUrl = require('normalize-url');

// TODO:
// Need to accept passing custom args, like a unique hash for cache busting
// /screenshots/revv:abcef01/http/www.pixelastic.com
// This should do exactly the same thing as without the revv:stuff, but would
// allo cloudinary to cache it
// any /key:value/ passed before the http/https is passed as option
//
// Need to deploy and test
// Refactor and document

module.exports = {
  /**
   * Parses an incoming request received by the handle, and return an object
   * with the full url parsed into usable components
   * @param {object} event The event object, as received by the handler
   * @returns {object} A parsed object of usable properties
   *  - targetUrl: The final url to take a screenshot of
   **/
  parseRequest(event) {
    const url = _.chain(event)
      .get('path')
      .replace('/screenshots/', '')
      .thru((item) => {
        const regex = /^(?<protocol>https?)\/(?<url>.*)$/;
        const { groups } = regex.exec(item);
        return `${groups.protocol}://${groups.url}`;
      })
      .value();

    const queryString = _.chain(event)
      .get('queryStringParameters')
      .map((value, key) => {
        return `${key}=${value}`;
      })
      .join('&')
      .thru((item) => {
        return item ? `?${item}` : '';
      })
      .value();

    const targetUrl = normalizeUrl(`${url}${queryString}`);

    return {
      targetUrl,
    };
  },

  /**
   * Returns a buffer containing a PNG image of the given url
   * @param {string} url Url to take a screenshot of
   * @returns {Buffer} A PNG buffer of the screenshot
   **/
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
      timeout: 9000,
      waitUntil: ['load', 'networkidle0', 'domcontentloaded'],
    });

    const screenshot = await page.screenshot({ type: 'png' });
    await browser.close();
    return screenshot;
  },
};
