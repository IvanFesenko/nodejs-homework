const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const contactRouter = require("./routes/contacts-routes.js");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use("/api/contacts", contactRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "for API use /api/contacts" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
