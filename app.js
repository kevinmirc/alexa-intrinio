/* jshint esversion: 6 */
var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var router = require('koa-route');
var _ = require('lodash');
var verifier = require('alexa-verifier')
var promisify = require("promisify-node");

var alexa = require('./services/alexa');
var alexaCtrl = require('./controllers/alexaController');

var app = koa();
var port = process.env.PORT || 3000;
var alexaVerifier = promisify(verifier);

app.use(bodyParser());
app.use(function *(next) {
  var time = new Date().getTime();
  var date = new Date(time);
  console.info('--->', this.method, this.url, date.toString());
  console.info('REQUEST BODY:\n', this.request.body, '\n');
  yield next;
  console.info();
  console.info('RESPONSE BODY:\n', _.get(this, 'body'), '\n');
  console.info('<---', this.status);
});

app.use(function * (next) {
  try {
    var cert_url = _.get(this, 'request.header.signaturecertchainurl');
    var signature = _.get(this, 'request.header.signature');
    var requestRawBody = JSON.stringify(this.request.body);
    yield alexaVerifier(cert_url, signature, requestRawBody);
    yield next;
  } catch (e) {
    console.log('Failed Alexa Verification', e);
    this.status = 400;
    return;
  }
});

app.use(router.post('/', function *(next) {
  var appId = _.get(this, 'request.body.session.application.applicationId');

  if (appId !== process.env.AMAZONAPPID) {
    this.status = 401;
    return;
  }

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
      this.body = alexa.buildResponseBody('Adios.', false);
      break;
    default:
      this.body = alexa.buildResponseBody('meh', true);
  }

  yield next;
}));

app.listen(port);
console.log('Using port', port);
