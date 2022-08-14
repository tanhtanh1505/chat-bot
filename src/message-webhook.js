const processMessage = require("./process-message");

module.exports = async (req, res) => {
  const ans = await processMessage.getAnswer(req.body.message);
  console.log(ans);
  res.status(200).send(ans);
};
