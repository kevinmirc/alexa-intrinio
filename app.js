/* jshint esversion: 6 */
var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var router = require('koa-route');
var _ = require('lodash');

var alexa = require('./services/alexa');
var alexaCtrl = require('./controllers/alexaController');

var app = koa();
var port = process.env.PORT || 3000;

app.use(bodyParser());

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

app.listen(port);
console.log('Using port', port);
