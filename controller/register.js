const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");
const { User } = require("../models");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;

    // <----- Schema validation ----->
    const schema = joi.object({
      fullName: joi.string().min(3).required(),
      email: joi.string().email().min(10).required(),
      password: joi.string().min(8).max(20).required(),
      phone: joi.string().min(10).required(),
      address: joi.string().required(),
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
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email already existed",
        },
      });
    }

    // <----- Hashed Password ----->
    const saltRound = 10;
    const hashedPassword = await bycript.hash(password, saltRound);

    const register = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // <----- JWT-Token ----->
    const token = jwt.sign(
      {
        id: register.id,
      },

      process.env.JWT_SECRET_KEY
    );

    // <---- Success response ---->
    res.status(200).send({
      message: "You have been registered",
      data: { register, token },
    });
  } catch (error) {
    console.log(error);
  }
};
