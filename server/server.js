const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authhandler = require("./routers/AuthRouter");

dotenv.config({ path: "./config.env" });

app.use(express.json());

app.use("/", authhandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASEPASS);

mongoose.connect(DB).then(() => {
  console.log("connected to the database");
});

//error handler
app.use((req, res, err, next) => {
  console.log("this is comming from the global erorr handler ", err);
  res.json({
    message: err.message,
  });
});

app.listen(9000, () => {
  console.log("server is running");
});
