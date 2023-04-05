const express = require("express");
const routes = require("./routes/index.js");
const db = require("./db");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
// const jsonParser = bodyParser.json()
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(cors());

// app.use(express.urlencoded({}))
app.use(express.static(`${__dirname}/client/build`));
app.use("/", routes);
app.get("/*", (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
