// Add toMatchImageSnapshot
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

// set the timeouts to 10s as it is what a Netlify function accepts
jest.setTimeout(10000);

// Visual regression tests are not run by default, as they are highly dependent
// on the OS running them. We only enable them when running on the CI, or when
// running in a local Docker container
const enableVisualRegressionTests = process.env.ENABLE_VISUAL_REGRESSION_TESTS;

global.describe.visual = enableVisualRegressionTests
  ? global.describe
  : global.describe.skip;
global.it.visual = enableVisualRegressionTests ? global.it : global.it.skip;
