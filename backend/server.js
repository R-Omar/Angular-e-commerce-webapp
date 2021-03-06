const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

//import routes
const authRoute = require("./routes/auth");
const userInfoRoute = require("./routes/userInfo");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const orderRoute = require("./routes/order");

dotenv.config();

//Enable CORS
app.use(cors());
app.use(bodyParser.json());

//connect to mongo DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => {
    console.log("Unable to connect to db");
    console.error(error);
  });

//route middleware
app.use("/api/user", authRoute);
app.use("/api/userInfo", userInfoRoute);
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/orders", orderRoute);

let server = app.listen(port, () =>{
  let host = server.address().address;
  let port = server.address().port;
  console.log("server is listening at host " + host + " port " + port);
});