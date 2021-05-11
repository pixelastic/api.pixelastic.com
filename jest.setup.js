// Add toMatchImageSnapshot
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

// set the timeouts to 10s as it is what a Netlify function accepts
jest.setTimeout(10000);

// Mark some tests as integration tests, to skip them when running only unit
// tests
const isNetlifyServerRunning = process.env.NETLIFY_SERVER_RUNNING;
global.describe.integration = isNetlifyServerRunning
  ? global.describe
  : global.describe.skip;
global.it.integration = isNetlifyServerRunning ? global.it : global.it.skip;
