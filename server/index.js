const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", require("./routes/index"));
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// mongoose connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error to mongoDB: "));
db.once("open", function () {
  console.log("Connected successfully to mongoDB");
});

// express server
app.listen(port, () => {
  console.log(`Server for Movie Library listening at ${port}`);
});
