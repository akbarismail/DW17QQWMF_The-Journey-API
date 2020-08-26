const { Journey, User } = require("../models");

exports.findJourneys = async (req, res) => {
  try {
    const journeys = await Journey.findAll({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["UserId", "userId", "createdAt", "updatedAt"],
      },
      order: [["id", "DESC"]],
    });

    res.status(200).send({
      message: "Data journeys success",
      data: journeys,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.findJourneyUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const readJourney = await Journey.findAll({
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      where: {
        userId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      order: [["id", "DESC"]],
    });
    if (!readJourney)
      return res.status(400).send({
        message: `Journey with id: ${userId} is not existed`,
      });

    res.status(200).send({
      message: `Journey with id ${userId} has been founded`,
      data: readJourney,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addJourney = async (req, res) => {
  try {
    const { title, userId, desc } = req.body;

    const journey = await Journey.create({
      title,
      userId,
      desc,
    });

    res.status(200).send({
      message: "Add journey success",
      data: journey,
    });
  } catch (error) {
    console.log(error);
  }
};
