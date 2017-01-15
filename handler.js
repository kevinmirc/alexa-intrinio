var request = require('request');
var auth = '67f266e881a827b3411379d3da2f5daf:f8c70c0f27ded954889b92c7328aed5e';

//slots from request
var companyName = 'Apple';
// 'https://api.intrinio.com/companies?query=' + companyName;
var dataPoint = 'opening price'; //open price, opening price, open

// mapped inputs
var ticker = 'AAPL';


request({
  method: 'GET',
  url: 'https://api.intrinio.com/data_point?identifier=AAPL&item=close_price',
  auth: {
      'user': '67f266e881a827b3411379d3da2f5daf',
      'pass': 'f8c70c0f27ded954889b92c7328aed5e'
  }
}, handleRes);

// request
//   .get('https://api.intrinio.com/prices?ticker=' + ticker)
//   .auth('67f266e881a827b3411379d3da2f5daf', 'f8c70c0f27ded954889b92c7328aed5e', false);

function handleRes(err, res, body) {
  if (err) { throw err; }
  console.log(body);
}
