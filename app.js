/* jshint esversion: 6 */
var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var logger = require('koa-logger');
var router = require('koa-route');
var _ = require('lodash');

var alexa = require('./services/alexa');
var alexaCtrl = require('./controllers/alexaController');

var app = koa();
var port = process.env.PORT || 3000;

app.use(bodyParser());
app.use(logger());

app.use(function *(next) {
  var time = new Date().getTime();
  var date = new Date(time);
  console.log(date.toString(), '\n\t',this.request.body);
  yield next;
});

app.use(router.post('/', function *(next) {
  var requestType = _.get(this, 'request.body.request.type');

  switch (requestType) {
    case 'IntentRequest':
      var intent = _.get(this, 'request.body.request.intent');
      this.body = yield alexaCtrl.handleIntent(intent);
      break;
    case 'LaunchRequest':
      this.body = alexa.buildResponseBody('What would you like to know.', true);
      break;
    case 'SessionEndedRequest':
      this.body = alexa.buildResponseBody('peace!', false);
      break;
    default:
      this.body = alexa.buildResponseBody('meh', true);
  }

  yield next;
}));

app.use(function *(next) {
  yield next;
  console.log(this.body);
});

app.listen(port);
console.log('Using port', port);
