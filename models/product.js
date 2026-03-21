const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    // Database connection
    const db = getDb();
    let dbOp;
    if (this._id) {
      //Update the product
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      // Collection
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .findOne({ _id: new mongodb.ObjectId(prodId) }) // Since mongodb stores id in a different way.
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
