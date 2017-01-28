##Issues with skill endpoint validation
The skill end-point is not accepting valid signed requests. Please make sure that your signature URL validation is correct and also, the skill end-point is not validating the signatures for incoming requests and is accepting requests with an invalid signature URL specified.  Please refer to the following documentation on how to build your Alexa Skill as a web service and validate requests and signatures.

[https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-web-service#verifying-the-signature-certificate-url](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-web-service#verifying-the-signature-certificate-url)


##Issues with skill in English (US)
___________________________________________________________________________________
1. The example phrases that you choose to present to users in the companion app must be included in your sample utterances. These sample utterances should not include the wake word or any relevant launch phrasing.

Please include the second and third example phrases in your sample utterances as shown below:

GetStockPrice     what was the {dataPoint} for {companyName}

For more information about the words included in our supported launch phrases, please see:

[https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/supported-phrases-to-begin-a-conversation](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/supported-phrases-to-begin-a-conversation)

2. The skill’s example phrases must not contain any additional instructions, emoticons, symbols, exclamation points, or grammatical errors. The example phrases must only include content that is intended to be spoken exactly by Alexa users.  Please see test case 3.1 from our Submission Checklist for more guidance on example phrases.

Please change your second and the third example phrase as shown below:

" ... what was the last price for Apple? " ==> " what was the last price for Apple? "

" ... what was the open price for Tesla? " ==> " what was the open price for Tesla? "

3. The skill does not exit when users say "stop" or "cancel".  Please see test case 4.13 from our Submission Checklist for guidance on skill exiting.

Example:

User: "Alexa start money mitch"

Skill: "What would you like to know."

User: "stop” / “cancel"

Skill: "Please provide me with a data point and a company name. You can say, for example: What was the last price for Apple. Or, what was the opening price for Amazon."

4. After the skill completes a task, the session remains open with no prompt to the user.  The skill must close the session after fulfilling requests if it does not prompt the user for any input.  Please refer to test case 4.1 from the Submission Checklist.

Example:

User: "Alexa ask money mitch what was the last price for apple"

Skill: "120 dollars and 09 cents per share" and the session remains open.
