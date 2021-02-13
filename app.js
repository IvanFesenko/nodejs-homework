const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const PORT = 8080;

const app = express();

app.use(cors());
app.use(morgan("combined"));

app.get("/contacts", (req, res) => {
  res.send("data");
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
