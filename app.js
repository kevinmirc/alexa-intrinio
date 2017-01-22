/* jshint esversion: 6 */
var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var router = require('koa-route');
var _ = require('lodash');

var alexa = require('./services/alexa');
var alexaCtrl = require('./controllers/alexaController');

console.log(alexaCtrl);

var app = koa();
var port = process.env.PORT || 3000;

app.use(bodyParser());

app.use(router.post('/', function *(next) {
  var requestType = _.get(this, 'request.body.request.type');

  switch (requestType) {
    case 'IntentRequest': //Invoking a Skill with a Specific Request (Intent)
        console.log('IntentRequest');
      var intent = _.get(this, 'request.body.request.intent');
      this.body = yield alexaCtrl.handleIntent(intent);
      break;
    case 'LaunchRequest': // Invoking a Skill with No Specific Request
      console.log('LaunchRequest');
      this.body = alexa.buildResponseBody(
          `Please provide me with a data point and a company name. ` +
          `You can say, for example: who is the C.E.O of Amazon. ` +
          `Or, what is the quick ratio of Apple.`, true
        );
      break;
    case 'SessionEndedRequest':
      console.log('SessionEndedRequest');
      this.body = alexa.buildResponseBody('bye.', false);
      break;
    default:
      this.body = alexa.buildResponseBody('meh', true);
  }

  yield next;
}));

app.listen(port);
console.log('Using port', port);
