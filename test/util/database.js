require("dotenv").config();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://camara:${process.env.MONGO_PASSWORD}@cluster0.utxip8x.mongodb.net/camara?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("Connected to mongoDB!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) return _db;

  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
