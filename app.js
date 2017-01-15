/* jshint esversion: 6 */
var koa = require('koa');
var app = koa();

var router = require('koa-route');
// var router = new Router();

// router.get('/', function *(next) {
//   this.body = {hello: 'world'};
//   yield next;
// });

app
  .use(router.get('/', function *(next) {

    // recieve companyquery
    // recieve dataPoint

    // return error is there is not both

    // use service to recieve company ticker from companyName
    // use the ticker to get that dataPoint
    // return speach string
    // return speach string with unit as string ex: "dollars", "shares", "percent", etc.
    this.body = this.request.query;
    yield next;
  }));

app.listen(3000);
