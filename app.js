const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { listContacts } = require("./contacts.js");

const PORT = 8080;

const app = express();

app.use(cors());
app.use(morgan("combined"));

app.get("/api/contacts", async (req, res) => {
  try {
    const data = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data,
    });
  } catch (err) {
    res.json({
      status: "fail",
      code: 500,
      message: "Something were wrong(",
      data: "Internal Server Error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
