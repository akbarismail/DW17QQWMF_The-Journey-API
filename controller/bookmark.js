const { Bookmark } = require("../models");

exports.addBookmark = async (req, res) => {
  try {
    const { journeyId } = req.body;

    const bookmark = await Bookmark.create({ journeyId });

    res.status(200).send({
      message: "Add bookmark success",
      data: bookmark,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.findBookmark = async (req, res) => {
  try {
    const { id } = req.params;

    const findBook = await Bookmark.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
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
