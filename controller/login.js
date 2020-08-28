const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");
const { User } = require("../models");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // <----- Schema validation ----->
    const schema = joi.object({
      email: joi.string().email().min(10).required(),
      password: joi.string().min(8).max(20).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    // <---- validation email same or not ---->
    const user = await User.findOne({
      where: {
        email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!user) {
      return res.status(400).send({
        error: {
          message: "Email or password is invalid",
        },
      });
    }

    const validPass = await bycript.compare(password, user.password);
    if (!validPass) {
      return res.status(400).send({
        error: {
          message: "Email or password is invalid",
        },
      });
    }
    // <----- JWT Token ----->
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY
    );

    // <---- Success response ---->
    res.status(200).send({
      message: "Login success",
      data: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
