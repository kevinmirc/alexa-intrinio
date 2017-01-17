# Alexa-Intrinio
**An Amazon Alexa Intrinio Skill**

This is an API for the Intrinio Amazon alexa skill.
(add link to skill here)
Status: `Under review by Amazon`


## Demo
"Who is the ceo of Tesla?" `Elon Reeve Musk.`

"How many employees does Amazon have?" `230,800.`

"What is the opening price for Apple?" `119 dollars and 11 cents per share.`

"What is the closing price for General Electric?" `31 dollars and 36 cents per share.`

"What is the debt to total capital for Bank of America" `48.2707 percent`


## Contribute
Clone project

`npm i` to install dependencies.

`nf run nodemon app.js` to serve app locally.


### Sample Request
POST to http://localhost:3000/ with this body:
```json
{
  "session": {
    "sessionId": "SessionId.1aab2ef6-c1cd-1ec1-1d68-1cd4b1212cec",
    "application": {
      "applicationId": "amzn1.ask.skill.abcd12dc-a12a-1a12-12ab-ab1234f1a1a1"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.ABCDEFGHIJKLMNOP"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.12f12345-d1ff-12a1-b12a-1b4c12cb123f",
    "locale": "en-US",
    "timestamp": "2017-01-17T01:05:10Z",
    "intent": {
      "name": "GetStockPrice",
      "slots": {
        "companyName": {
          "name": "companyName",
          "value": "Apple"
        },
        "dataPoint": {
          "name": "dataPoint",
          "value": "days to cover"
        }
      }
    }
  },
  "version": "1.0"
}
```

### Sample Request
```json
{
  "version": 1,
  "response": {
    "outputSpeech": {
      "type": "SSML",
      "ssml": "<speak>Tim Cook</speak>"
    }
  },
  "sessionAttributes": {}
}
```

## TODO
- add card response in endpoint: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/providing-home-cards-for-the-amazon-alexa-app.
- add a db to store every request, intent, and if it was successfully responded to (for reporting and improving the service).
- create unit tests for each service
- create end-to-end tests
- check with someone at Intrinio to see if percentages should be taken literal or be multiplied by 100 (currently being multiplied).

## Alexa Configuration
Keywords:
- Finance, Data, Financial, Stock, Trading, Fintech, Intrinio, Financial, Market, Information, Datasets, Value
