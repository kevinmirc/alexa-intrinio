/* jshint esversion: 6 */
var config = require('../config.json').intrinio;
var rp = require('request-promise');

if (!config.userName && !config.password) {
  throw 'Missing configuration for intrinio service';
}

var opts = {
  'auth': {
    'user': config.userName,
    'pass': config.password
  }
};

var uri = `https://api.intrinio.com`;

module.exports = {
  getDataPoint: function (identifier, dataPoint) {
    return rp.get(`${uri}/data_point?identifier=${identifier}&item=${dataPoint}`, opts);
  },
  queryCompany: function (query) {
    return rp.get(`${uri}/companies?query=${query}`, opts);
  }
};
