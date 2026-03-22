const mongodb = require("mongodb");
const { getDb } = require("../utils/database");

const ObjectId = mongodb.ObjectId;
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("User saved:", result);
      })
      .catch((err) => console.log(err));
  }

  findById(id) {
    // Logic to find a user by ID
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then((user) => {
        console.log("User found:", user);
        return user;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
