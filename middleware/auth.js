const jwt = require("jsonwebtoken");

exports.authenticated = (req, res, next) => {
  // <--- init variable ---->
  let header, token;

  // <---- conditional check user send token or not ----->
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  )
    return res.status(400).send({
      error: {
        message: "Access Denied",
      },
    });
  try {
    // <---- verified token ---->
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = verified;
    next(); // if token valid go to next request
  } catch (error) {
    // if token not valid send response
    res.status(400).send({
      error: {
        message: "Invalid Token",
      },
    });
  }
};
