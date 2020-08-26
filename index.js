require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multiparty = require("connect-multiparty");

const MultipartyMiddleware = multiparty({ uploadDir: "./uploads" });
const morgan = require("morgan");
const app = express();

app.use(cors());

const port = 5000;
const routerV1 = require("./routes/routerV1");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Succes",
  });
});
app.use("/uploads", express.static("uploads"));
app.use("/api/v1", routerV1);

app.listen(port, () => console.log(`Listening on port ${port}`));
