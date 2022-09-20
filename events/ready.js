const mongoUtil = require('../mongoUtil.js');

module.exports = async (client) => {
  await mongoUtil.connectDB(client);

  client.ready = true;
  client.user.setActivity(`la course`, {type: 'WATCHING'});
  console.log('Bot prêt');
};
