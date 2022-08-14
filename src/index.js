require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const messageWebhook = require("./message-webhook");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", messageWebhook);

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Express server is listening on port ${port}`)
);
