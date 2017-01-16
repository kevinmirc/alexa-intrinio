/* jshint esversion: 6 */
/*
response body should look like this:
<speak>
    Here is a number spoken as a cardinal number:
    <say-as interpret-as="cardinal">12345</say-as>.
    Here is the same number with each digit spoken separately:
    <say-as interpret-as="digits">12345</say-as>.
    Here is a word spelled out: <say-as interpret-as="spell-out">hello</say-as>
</speak>
*/
var _ = require('lodash');
// var interpretAsOptions =
// /*
// haracters, spell-out: Spell out each letter.
// cardinal, number: Interpret the value as a cardinal number.
// ordinal: Interpret the value as an ordinal number.
// digits: Spell each digit separately .
// fraction: Interpret the value as a fraction. This works for both common fractions (such as 3/20) and mixed fractions (such as 1+1/2).
// unit: Interpret a value as a measurement. The value should be either a number or fraction followed by a unit (with no space in between) or just a unit.
// date: Interpret the value as a date. Specify the format with the format attribute.
// time: Interpret a value such as 1'21" as duration in minutes and seconds.
// telephone: Interpret a value as a 7-digit or 10-digit telephone number. This can also handle extensions (for example, 2025551212x345).
// address: Interpret a value as part of street address.
// */
// [haracters, spell-out, cardinal, number, ordinal, digits, fraction, unit, date, time, telephone, address];

module.exports = {
  // return speach string
  // return speach string with unit as string ex: "dollars", "shares", "percent", etc.
  buildResponseBody: function (text, speachType, unit) {
    return res(`<speak>${text}</speak>`);
  }
};

function res(text) {
  return {
    "response": {
      "outputSpeach": {
        type: "ssml",
        ssml: text
      }
    },
    "sessionAttributes": {}
  };
}
