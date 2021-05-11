const config = require('aberlaas/lib/configs/lintstaged.js');
module.exports = {
  ...config,
  './functions/**/*.js': ['yarn run test --failFast --findRelatedTests'],
};
