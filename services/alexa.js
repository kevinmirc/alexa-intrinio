/* jshint esversion: 6 */
/*
characters, spell-out: Spell out each letter.
cardinal, number: Interpret the value as a cardinal number.
ordinal: Interpret the value as an ordinal number.
digits: Spell each digit separately .
fraction: Interpret the value as a fraction. This works for both common fractions (such as 3/20) and mixed fractions (such as 1+1/2).
unit: Interpret a value as a measurement. The value should be either a number or fraction followed by a unit (with no space in between) or just a unit.
date: Interpret the value as a date. Specify the format with the format attribute.
time: Interpret a value such as 1'21" as duration in minutes and seconds.
telephone: Interpret a value as a 7-digit or 10-digit telephone number. This can also handle extensions (for example, 2025551212x345).
address: Interpret a value as part of street address.
*/
var _ = require('lodash');

module.exports = {
  buildResponseBody: buildResponseBody,
  buildResponseBodyFromIntrinioDataPoint: buildResponseBodyFromIntrinioDataPoint
};

var verbalizationMapping = {
  'usdpershare': {
    intrinioUnit: 'usdpershare',
    conversion: function (value) {
      var fractionalNum = _.toString(value).split('.')[1];
      var intervalNum = _.toString(value).split('.')[0];
      return `<say-as interpret-as="cardinal">${intervalNum || 0}</say-as> dollars and <say-as interpret-as="cardinal">${fractionalNum || 0}</say-as> cents per share`;
    }
  },
  'usd': {
    intrinioUnit: 'usd',
    conversion: function (value) {
      var fractionalNum = _.toString(value).split('.')[1];
      var intervalNum = _.toString(value).split('.')[0];
      return `<say-as interpret-as="cardinal">${intervalNum || 0}</say-as> dollars and <say-as interpret-as="cardinal">${fractionalNum || 0}</say-as> cents`;
    }
  },
  'shares': {
    intrinioUnit: 'shares',
    conversion: function (value) {
      return `${value} shares`;
    }
  },
  'percentage': {
    intrinioUnit: 'percentage',
    conversion: function (value) {
      value = value || 0;
      value = value * 100;
      return `${value} percent`;
    }
  },
  'days': {
    intrinioUnit: 'days',
    conversion: function (value) {
      return `${value} days`;
    }
  }
};

function buildResponseBody(text) {
  return res(`<speak>${text}</speak>`);
}

function buildResponseBodyFromIntrinioDataPoint(value, intrinioDataPoint) {
  var conversion = _.get(verbalizationMapping[intrinioDataPoint.unit], 'conversion');
  if (conversion) { value = conversion(value); }
  return buildResponseBody(value);
}

function res(text) {
  return {
    version: 1.0,
    response: {
      outputSpeech: {
        type: "SSML",
        ssml: text
      }
    },
    sessionAttributes: {}
  };
}
