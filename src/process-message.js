const fetch = require("node-fetch");

const projectId = "sample-bot-yixb";
const sessionId = "sample-bot";
const languageCode = "vi-VN";

const dialogflow = require("@google-cloud/dialogflow");

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  },
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

module.exports.getAnswer = async (message) => {
  // console.log(`MESSAGE RECIEVE: ${message}`);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  let ans = "UNKNOWN";

  await sessionClient
    .detectIntent(request)
    .then((responses) => {
      ans = responses[0].queryResult.fulfillmentText;
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });

  return ans;
};
