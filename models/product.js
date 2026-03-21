const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    // Database connection
    const db = getDb();
    // Collection
    return db
      .collection("products")
      .insertOne(this)
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
}

module.exports = Product;
