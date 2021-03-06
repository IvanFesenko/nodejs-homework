const mongoose = require("mongoose");

const uri = process.env.DB_URI;

const db = mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Database successful connected");
});

mongoose.connection.on("error", (err) => {
  console.log(`Database connection error ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Database connection was terminated");
  process.exit(1);
});

module.exports = db;
