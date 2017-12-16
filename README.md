# Alexa-Intrinio
**An Amazon Alexa Intrinio Skill**

This is an API for the unofficial Intrinio Amazon Alexa skill: [Market Savvy](https://www.amazon.com/Kevin-Mircovich-Apps-Market-Savvy/dp/B01N4OW2Z4)
Status: Published


## Demo
"What was the opening price for Apple?" `120 dollars and 0 cents per share.`

"What was the closing price for Amazon?" `844 dollars and 43 cents per share.`

"What was the last price for Facebook?" `128 dollars and 94 cents per share.`

"What is the 52 week low for Bank of America" `$10.99 per share`

"How many employees does Tesla have" `13,058`


## Contribute
Clone project

`npm i` to install dependencies.

`npm install -g foreman` install node-foreman globally

Set these global vars:
- `AMAZONAPPID` (the amazon id in req needs to match the one in the environment to authenticate)
- `INTRINIO_USERNAME`
- `INTRINIO_PASSWORD`

`nf run nodemon app.js` to serve app locally.

Runs on node verion: `5.6.0`


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
    "requestId": "EdwRequestId.63b3cf70-3f95-4c06-bf33-891567a0e819",
    "locale": "en-US",
    "timestamp": "2017-01-23T00:43:37Z",
    "intent": {
      "name": "GetStockPrice",
      "slots": {
        "companyName": {
          "name": "companyName",
          "value": "amazon"
        },
        "dataPoint": {
          "name": "dataPoint",
          "value": "price"
        }
      }
    }
  },
  "version": "1.0"
}
```

### Sample Response
```json
{
  "version": 1,
  "response": {
    "outputSpeech": {
      "type": "SSML",
      "ssml": "<speak><say-as interpret-as=\"cardinal\">807</say-as> dollars and <say-as interpret-as=\"cardinal\">79</say-as> cents per share</speak>"
    },
    "card": {
      "type": "Simple",
      "title": "Powered by Intrinio",
      "content": "$807.79 per share."
    },
    "reprompt": {
      "outputSpeech": {
        "type": "PlainText",
        "text": "Can I help you with anything else? Ask for a data point, or say 'exit'."
      }
    },
    "shouldEndSession": false
  }
}
```

## TODO
- add a db to store every request, intent, and if it was successfully responded to (for reporting and improving the service).
- create unit tests for each service
- create end-to-end tests
