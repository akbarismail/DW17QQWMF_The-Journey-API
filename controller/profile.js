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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { imageUser } = req.files;
    const imgUser = imageUser;
    await imgUser.mv(`./uploads/${imgUser}`);

    const changeUser = await User.update({
      userImg: imgUser,
      where: { id },
    });

    res.status(200).send({
      message: "User has been updated",
      data: changeUser,
    });
  } catch (error) {
    console.log(error);
  }
};
