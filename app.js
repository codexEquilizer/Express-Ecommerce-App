const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// importing models
const Product = require("./models/product");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Association
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); //Many To One Relation
User.hasMany(Product); // One To Many Relation

sequelize
  .sync({ force: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
