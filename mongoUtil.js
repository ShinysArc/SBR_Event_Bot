/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const { MongoClient } = require('mongodb');
const { mongodburi } = require('./config.js');
const config = require('./config');

const uri = mongodburi;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true }, { autoIndex: false }, { useUnifiedTopology: true });

module.exports = {
  connectDB: async (client) => {
    await mongoClient.connect();
    client.db = {};
    client.db.config = await mongoClient.db().collection(config.collection.config);
    client.db.userdata = await mongoClient.db().collection(config.collection.userdata);
    console.log('mongoDB is now connected!');
    return mongoClient;
  },
};
