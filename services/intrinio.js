/* jshint esversion: 6 */
var rp = require('request-promise');
var env = process.env;

if (!env.INTRINIO_USERNAME && !env.INTRINIO_PASSWORD) {
  throw 'Missing configuration for intrinio service';
}

var opts = {
  'auth': {
    'user': env.INTRINIO_USERNAME,
    'pass': env.INTRINIO_PASSWORD
  }
};

var uri = `https://api.intrinio.com`;

module.exports = {
  getDataPoint: function (identifier, dataPoint) {
    console.info(`DataPoint: ${dataPoint}, Identifier: ${identifier}\n`);
    return rp.get(`${uri}/data_point?identifier=${identifier}&item=${dataPoint}`, opts);
  },
  queryCompany: function (query) {
    console.info(`\nCompany Query:${query}`);
    return rp.get(`${uri}/companies?query=${query}`, opts);
  }
};
