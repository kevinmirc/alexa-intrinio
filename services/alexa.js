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
  buildResponseBodyFromIntrinioDataPoint: buildResponseBodyFromIntrinioDataPoint,
  helpResponse: getHelpPrompt()
};

var verbalizationMapping = {
  'usdpershare': {
    intrinioUnit: 'usdpershare',
    getSsmlValue: function (value) {
      var fractionalNum = _.toString(value).split('.')[1];
      var intervalNum = _.toString(value).split('.')[0];
      return `<say-as interpret-as="cardinal">${intervalNum || 0}</say-as> dollars and <say-as interpret-as="cardinal">${fractionalNum || 0}</say-as> cents per share`;
    },
    getDisplayValue: function (value) {
      return `$${value} per share.`;
    }
  },
  'usd': {
    intrinioUnit: 'usd',
    getSsmlValue: function (value) {
      var fractionalNum = _.toString(value).split('.')[1];
      var intervalNum = _.toString(value).split('.')[0];
      return `<say-as interpret-as="cardinal">${intervalNum || 0}</say-as> dollars and <say-as interpret-as="cardinal">${fractionalNum || 0}</say-as> cents`;
    },
    getDisplayValue: function (value) {
      return `$${value}`;
    }
  },
  'shares': {
    intrinioUnit: 'shares',
    getSsmlValue: function (value) {
      return `${value} shares`;
    },
    getDisplayValue: function (value) {
      return `${value} shares`;
    }
  },
  'percentage': {
    intrinioUnit: 'percentage',
    getSsmlValue: function (value) {
      value = value || 0;
      value = value * 100;
      return `${value} percent`;
    },
    getDisplayValue: function (value) {
      return `${value}%`;
    }
  },
  'days': {
    intrinioUnit: 'days',
    getSsmlValue: function (value) {
      return `${value} days`;
    },
    getDisplayValue: function (value) {
      return `${value} days`;
    }
  }
};

function getHelpPrompt() {
  return  `Please provide me with a data point and a company name.`;
}

function buildResponseBody(ssml, keepSessionOpen, cardContent) {
  return res(`<speak>${ssml}</speak>`, keepSessionOpen, cardContent || ssml);
}

function buildResponseBodyFromIntrinioDataPoint(value, intrinioDataPoint) {
  var toText = _.get(verbalizationMapping[intrinioDataPoint.unit], 'getDisplayValue');
  var toSSML = _.get(verbalizationMapping[intrinioDataPoint.unit], 'getSsmlValue');

  var ssmlValue = toSSML ? toSSML(value) : value;
  var textValue = toText ? toText(value) : value;

  return buildResponseBody(ssmlValue, false, textValue);
}

function res(ssml, keepSessionOpen, cardContent) {
  var response = {
    version: 1.0,
    response: {
      outputSpeech: {
        type: "SSML",
        ssml: ssml
      },
      card: {
        type: "Simple",
        title: "Powered by Intrinio",
        content: cardContent || ''
      },
      reprompt: {
        outputSpeech: {
          type: "PlainText",
          text: "Can I help you with anything else? Ask for a data point or say exit."
        }
      },
      shouldEndSession: !keepSessionOpen
    }
  };

  return response;
}
