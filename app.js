/* jshint esversion: 6 */
var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var router = require('koa-route');
var _ = require('lodash');

var intrinio = require('./services/intrinio');
var dataPointMapping = require('./services/dataPointMapping');
var alexa = require('./services/alexa');

var app = koa();
var port = process.env.PORT || 3000;

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
      var intrinioDataPoint = dataPointMapping.find(requestedDataPoint);
      if (intrinioDataPoint) {
        var dataPointRes = yield intrinio.getDataPoint(company.ticker, intrinioDataPoint.intrinioDataPoint);
        dataPointRes = JSON.parse(dataPointRes);
        this.body = alexa.buildResponseBodyFromIntrinioDataPoint(dataPointRes.value, intrinioDataPoint);
      } else {
        this.statusCode = 404;
        this.body = alexa.buildResponseBody(`Could not find ${requestedDataPoint} for ${requestedCompanyName}`);
      }
    } else {
      this.statusCode = 404;
      this.body = alexa.buildResponseBody(`Could not find a company with the name ` + requestedCompanyName);
    }
  } else {
    this.statusCode = 400;
    this.body = alexa.buildResponseBody(
      `Please provide me with a data point and a company name. ` +
      `You can say, for example: who is the C.E.O of Amazon. ` +
      `Or, what is the quick ratio of Apple.`
      );
  }
  yield next;
}));

app.listen(port);
console.log('Using port', port);
