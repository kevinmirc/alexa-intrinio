# Amazon Alexa Intrinio Skill
This is an API for the Intrinio Amazon alexa skill.
(add link to skill here)
Status: `Under review by Amazon`

## Example Requests
"Who is the ceo of Tesla?" `Elon Reeve Musk.`
"How many employees does Amazon have?" `230,800.`
"What is the opening price for Apple?" `119 dollars and 11 cents per share.`
"What is the closing price for General Electric?" `31 dollars and 36 cents per share.`
"What is the debt to total capital for Bank of America" `48.2707 percent`

## Contribute
clone project
`npm i` to install dependencies.
`nf run nodemon app.js` to serve app locally.

## TODO
- clean up for publishing
- add card response in endpoint: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/providing-home-cards-for-the-amazon-alexa-app.
- add prefixed to _services/alexa_ so Alexa can answer in complete sentences.
- add a db to store every request, intent, and if it was successfully responded to (for reporting and improving the service).
- create unit tests for each service
- create end-to-end tests
- check with someone at Intrinio to see if percentages should be taken literal or be multiplied by 100 (currently being multiplied).

## Alexa Configuration
Keywords:
- Finance, Data, Financial, Stock, Trading, Fintech, Intrinio, Financial, Market, Information, Datasets, Value
