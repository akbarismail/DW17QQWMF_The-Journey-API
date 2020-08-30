const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const routerV1 = require("./routes/routerV1");
// const morgan = require("morgan");

const multiparty = require("connect-multiparty");
require("dotenv").config();

const MultipartyMiddleware = multiparty({ uploadDir: "./uploads" });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1", routerV1);
app.use("/uploads", express.static("uploads"));

// app.use("/uploads", MultipartyMiddleware, express.static("uploads"));

app.post("/uploads", MultipartyMiddleware, (req, res) => {
  console.log(req.files.upload);
  var TempFile = req.files.upload.path;

  res.status(200).json({
    uploaded: true,
    url: `http://localhost:5000/${TempFile}`,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
