/* jshint esversion: 6 */
var port = process.env.PORT || 3000;
var koa = require('koa');
var app = koa();

var router = require('koa-route');
var intrinio = require('./services/intrinio');
var dataPointMapping = require('./services/dataPointMapping');
var alexa = require('./services/alexa');

app
  .use(router.get('/', function *(next) {
    console.log(`HIT GET '/'`, this.request);
    var _ = require('lodash');

    if (this.query.companyName && this.query.dataPoint) {
      console.log(this.request);
      var companyRes = yield intrinio.queryCompany(this.query.companyName);
      var companies = JSON.parse(companyRes).data;
      var company = _.head(companies);

      if (company) {
        // convert the human readable dataPoint string to an intrinio-api friendly datapoint string
        var dataPoint = dataPointMapping.find(this.query.dataPoint);
        if (dataPoint) {
          var dataPointRes = yield intrinio.getDataPoint(company.ticker, dataPoint.intrinioDataPoint);
          dataPointRes = JSON.parse(dataPointRes);
          this.body = alexa.buildResponseBody(dataPointRes.value, 'speachType', 'Unit');
        } else {
          console.warn(`Unmatched data point query: '${this.query.dataPoint}'`);
          this.statusCode = 404;
          this.body = alexa.buildResponseBody(`Could not find ${this.query.dataPoint} for ${this.query.companyName}`);
        }
      } else {
        this.statusCode = 404;
        this.body = alexa.buildResponseBody(`Could not find a company with name: ${this.query.companyName}`);
      }
    } else {
      this.statusCode = 400;
      this.body = alexa.buildResponseBody(`Must provide query for companyName and dataPoint.`);
    }
    yield next;
  }));

app.use(router.post('/', function *(next) {
  console.log(`HIT POST '/'`, this.request);
  yield next;
}));

app.listen(port);
console.log('Using port', port);
