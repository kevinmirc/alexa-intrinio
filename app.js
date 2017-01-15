/* jshint esversion: 6 */
var koa = require('koa');
var app = koa();

var router = require('koa-route');
var intrinio = require('./services/intrinio');
var dataPointMapping = require('./services/dataPointMapping');
// var router = new Router();

// router.get('/', function *(next) {
//   this.body = {hello: 'world'};
//   yield next;
// });

app
  .use(router.get('/', function *(next) {
    var _ = require('lodash');

    // recieve companyquery
    // recieve dataPoint

    // return error is there is not both


    console.log(this.query.companyName);
    console.log(this.query.dataPoint);

    if (this.query.companyName && this.query.dataPoint) {
      var res = yield intrinio.queryCompany(this.query.companyName);
      var companies = JSON.parse(res).data;
      var company = _.head(companies);

      if (company) {
        console.log(company);
        // convert the human readable dataPoint string to an intrinio-api friendly datapoint string
        var dataPoint = null;//dataPointMapping.find(this.query.dataPoint);
        if (dataPoint) {
          this.body = yield intrinio.getDataPoint(company.ticker, dataPoint.intrinioDataPoint);
        } else {
          this.statusCode = 404;
          this.body = {error: `Could not find ${this.query.dataPoint} for ${this.query.companyName}`};
        }
        // return speach string
        // return speach string with unit as string ex: "dollars", "shares", "percent", etc.
      } else {
        this.statusCode = 404;
        this.body = {error: `Could not find a company with name: ${this.query.companyName}`};
      }
    } else {
      this.statusCode = 400;
      this.body = {error: `Must provide query for companyName and dataPoint.`};
    }
    yield next;
  }));

app.listen(3000);
