/*
  Values from ./dataPoints.txt are copied from Intrinio's list of datavalues
  located here: http://docs.intrinio.com/tags/intrinio-public#data-point
*/
var fs = require('fs');

fs.readFile('./scripts/dataPoints.txt', 'utf-8', writeToOutFile);

function parse(data) {
  var newData = data.split('\n');
  var map = {};
  newData.forEach(function (str) {
    // 'Total Other Income / (Expense), net\ttotalotherincome\tincome_statement\t\tusd'
    var rowArray = str.split('\t');
    map[rowArray[0].toLowerCase()] = {
      label: rowArray[0],
      intrinioDataPoint: rowArray[1],
      statementCode: rowArray[2],
      type: rowArray[3],
      unit: rowArray[4],
      supported: rowArray[4] === 'operating' ? false : true
    };
  });
  return map;
}

function writeToOutFile(err, data) {
  if (err) { throw err; }
  parse(data);
  fs.writeFile('./newDataPoints.json', JSON.stringify(parse(data), null, 2));
}
