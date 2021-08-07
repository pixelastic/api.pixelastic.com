const config = require('aberlaas/configs/lintstaged.js');
module.exports = {
  ...config,
  './functions/**/*.js': ['yarn run test --failFast --findRelatedTests'],
};
