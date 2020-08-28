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
        exclude: ["UserId", "userId", "updatedAt"],
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
    const journey = await Journey.create({
      ...req.body,
    });

    res.status(200).send({
      message: "Add journey success",
      data: journey,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.findJourney = async (req, res) => {
  try {
    const { id } = req.params;

    const detailJourney = await Journey.findOne({
      where: {
        id,
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    if (!detailJourney)
      return res.status(400).send({
        message: `Journey with id: ${id} is not existed`,
      });

    res.status(200).send({
      message: `Journey with id ${id} has been founded`,
      data: detailJourney,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateJourney = async (req, res) => {
  try {
    const { id } = req.params;

    const editJourney = await Journey.update(req.body, { where: { id } });

    res.status(200).send({
      message: `Journey id ${id} has been updated`,
      data: editJourney,
    });
  } catch (error) {
    console.log(error);
  }
};
