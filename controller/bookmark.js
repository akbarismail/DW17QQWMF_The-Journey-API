const { Bookmark, User, Journey } = require("../models");

exports.addBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.create(req.body);

    res.status(200).send({
      message: "Add bookmark success",
      data: bookmark,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.findUserBookmark = async (req, res) => {
  try {
    const { bmUserId } = req.params;

    const findBook = await Bookmark.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
        {
          model: Journey,
          as: "journey",
          attributes: {
            exclude: ["userId", "createdAt", "updatedAt"],
          },
        },
      ],
      order: [["id", "DESC"]],

      where: {
        bmUserId,
      },

      attributes: {
        exclude: ["bmUserId", "journeyId", "createdAt", "updatedAt"],
      },
    });

    if (!findBook)
      return res.status(400).send({
        message: `Bookmark with id: ${id} is not existed`,
      });

    res.status(200).send({
      message: "respon success",
      data: findBook,
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

exports.deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;

    const delBookmark = await Bookmark.destroy({ where: { id } });

    if (!delBookmark)
      return res.status(400).send({
        message: `Bookmark with id: ${id} is not existed`,
      });

    res.status(200).send({
      message: `Trip has been deleted`,
      data: id,
    });
  } catch (error) {
    console.log(error);
  }
};
