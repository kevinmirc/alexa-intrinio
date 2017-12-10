/* jshint esversion: 6 */
var _ = require('lodash');
var intrinio = require('../services/intrinio');
var dataPointMapping = require('../services/dataPointMapping');
var alexa = require('../services/alexa');

var handleIntent = function * (intent) {
  var requestedCompanyName = _.get(intent, 'slots.companyName.value');
  var requestedDataPoint = _.get(intent, 'slots.dataPoint.value');

  if (requestedDataPoint && requestedCompanyName) {
    var companyRes = yield intrinio.queryCompany(requestedCompanyName);
    var companies = JSON.parse(companyRes).data;
    var company = _.head(companies);

    if (company) {
      // convert the human readable dataPoint string to an intrinio-api friendly datapoint string
      var intrinioDataPoint = dataPointMapping.find(requestedDataPoint);
      if (intrinioDataPoint) {
        var dataPointRes = yield intrinio.getDataPoint(company.ticker, intrinioDataPoint.intrinioDataPoint);
        dataPointRes = JSON.parse(dataPointRes);
        return alexa.buildResponseBodyFromIntrinioDataPoint(dataPointRes.value, intrinioDataPoint);
      } else {
        return alexa.buildResponseBody(`Could not find ${requestedDataPoint} for ${requestedCompanyName}`, true);
      }
    } else {
      return alexa.buildResponseBody(`Could not find a company with the name ` + requestedCompanyName, true);
    }
  } else {
    return alexa.buildResponseBody(alexa.helpResponse, true);
  }
};

var openSession = function () {
  return alexa.buildResponseBody();
};

module.exports = {
  handleIntent: handleIntent,
  openSession: openSession
};
