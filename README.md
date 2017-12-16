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

## TODO
- add a db to store every request, intent, and if it was successfully responded to (for reporting and improving the service).
- create unit tests for each service
- create end-to-end tests
