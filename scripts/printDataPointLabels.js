/*
  Prints the labels of dataPonts in enums to paste into
  alexa DATAPOINTS slot for interpritation.
*/
var fs = require('fs');
var _ = require('lodash');

fs.readFile('./enums/dataPoints.json', 'utf-8', printLabels);

function printLabels(err, data) {
  if (err) { throw err; }
  data = JSON.parse(data);
  return _.forEach(data, function (value, key) {
    console.log(key);
    return key;
  });
}
