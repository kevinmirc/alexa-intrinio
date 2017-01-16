/* jshint esversion: 6 */
var port = process.env.PORT || 3000;
var koa = require('koa');
var app = koa();
var bodyParser = require('koa-bodyparser');

var router = require('koa-route');
var intrinio = require('./services/intrinio');
var dataPointMapping = require('./services/dataPointMapping');
var alexa = require('./services/alexa');

var _ = require('lodash');

app.use(bodyParser());

app.use(router.post('/', function *(next) {
  var intent = _.get(this, 'request.body.request.intent');
  var requestedCompanyName = _.get(intent, 'slots.companyName.value');
  var requestedDataPoint = _.get(intent, 'slots.dataPoint.value');

  if (requestedDataPoint && requestedCompanyName) {
    var companyRes = yield intrinio.queryCompany(requestedCompanyName);
    var companies = JSON.parse(companyRes).data;
    var company = _.head(companies);

    if (company) {
      // convert the human readable dataPoint string to an intrinio-api friendly datapoint string
      var dataPoint = dataPointMapping.find(requestedDataPoint);
      if (dataPoint) {
        var dataPointRes = yield intrinio.getDataPoint(company.ticker, dataPoint.intrinioDataPoint);
        dataPointRes = JSON.parse(dataPointRes);
        this.body = alexa.buildResponseBody(dataPointRes.value, 'speachType', 'Unit');
      } else {
        console.warn(`Unmatched data point query: '${requestedDataPoint}'`);
        this.statusCode = 404;
        this.body = alexa.buildResponseBody(`Could not find ${requestedDataPoint} for ${requestedCompanyName}`);
      }
    } else {
      this.statusCode = 404;
      this.body = alexa.buildResponseBody(`Could not find a company with name: ` + requestedCompanyName);
    }
  } else {
    this.statusCode = 400;
    this.body = alexa.buildResponseBody(`Must provide query for companyName and dataPoint.`);
  }
  yield next;
}));

app.listen(port);
console.log('Using port', port);
