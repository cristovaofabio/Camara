require("dotenv").config();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://camara:${process.env.MONGO_PASSWORD}@cluster0.utxip8x.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("Connected to mongoDB!");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
