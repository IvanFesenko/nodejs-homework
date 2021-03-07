const app = require("../app.js");
const db = require("../model/mongodb");

const PORT = 8080;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
}).catch(({ message }) => {
  console.log(`Server starting error: ${message}`);
});
