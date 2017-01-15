var intrinioDataPoints = require('../enums/dataPoints.json');
var _ = require('lodash');

module.exports = {
  find: function (query) {
    var result = intrinioDataPoints[_.lowerCase(query)];
    return result;
  }
};
