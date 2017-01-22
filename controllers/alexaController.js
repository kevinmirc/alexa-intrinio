/* jshint esversion: 6 */
var _ = require('lodash');
var intrinio = require('../services/intrinio');
var dataPointMapping = require('../services/dataPointMapping');
var alexa = require('../services/alexa');

handleIntent = function * (intent) {
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
        this.statusCode = 404;
        return alexa.buildResponseBody(`Could not find ${requestedDataPoint} for ${requestedCompanyName}`);
      }
    } else {
      this.statusCode = 404;
      return alexa.buildResponseBody(`Could not find a company with the name ` + requestedCompanyName);
    }
  } else {
    this.statusCode = 400;
    return alexa.buildResponseBody(
      `Please provide me with a data point and a company name. ` +
      `You can say, for example: who is the C.E.O of Amazon. ` +
      `Or, what is the quick ratio of Apple.`, true
      );
  }
};

openSession = function () {
  return alexa.buildResponseBody();
};

module.exports = {
  handleIntent: handleIntent,
  openSession: openSession
};
