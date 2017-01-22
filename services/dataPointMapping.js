var intrinioDataPoints = require('../enums/dataPoints.json');
var _ = require('lodash');

additionalDataPointMappings = {
  'price': 'last price',
  'cost': 'last price',
  'stock price': 'last price',
  'C.E.O': 'ceo',
  'open price': 'opening price',
  'close price': 'closing price'
};

// create additional data point interpretations
_.forEach(additionalDataPointMappings, function (targetDataPoint, requestedDataPoint) {
  intrinioDataPoints[requestedDataPoint] = intrinioDataPoints[targetDataPoint];
});

module.exports = {
  find: function (query) {
    var result = intrinioDataPoints[_.lowerCase(query)];
    return result;
  }
};
