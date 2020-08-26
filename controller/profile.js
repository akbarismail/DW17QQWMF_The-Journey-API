const { User } = require("../models");

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;

    const findUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    if (!findUser)
      return res.status(400).send({
        message: `User with id: ${id} is not existed`,
      });

    res.status(200).send({
      message: "respon success",
      data: findUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      err: {
        message: "Server Error Check Your System",
      },
    });
  }
};
