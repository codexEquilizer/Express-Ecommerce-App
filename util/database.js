const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const URL =
  "mongodb+srv://root:root@cluster007.0ullloa.mongodb.net/?appName=Cluster007";

const mongoConnect = (callback) => {
  MongoClient.connect(URL)
    .then((result) => {
      console.log("Connected!");
      callback(result);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
