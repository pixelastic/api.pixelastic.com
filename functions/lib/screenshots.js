const _ = require('golgoth/lodash');
const chromium = require('chrome-aws-lambda');
const normalizeUrl = require('normalize-url');

module.exports = {
  /**
   * Parses an incoming request received by the handle, and return an object
   * with the full url parsed into usable components
   * @param {object} event The event object, as received by the handler
   * @returns {object} A parsed object of usable properties
   *  - targetUrl: The final url to take a screenshot of
   **/
  parseRequest(event) {
    const regexp = new RegExp(
      '^/screenshots/(?<raw_options>.*/)?(?<protocol>https?)/(?<url>.*)$'
    );
    const { groups } = event.path.match(regexp);

    const url = `${groups.protocol}://${groups.url}`;

    const options = _.chain(groups)
      .get('raw_options', '')
      .split('/')
      .compact()
      .map((item) => {
        return item.split(':');
      })
      .fromPairs()
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
      options,
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
