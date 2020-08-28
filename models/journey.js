"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Journey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Journey.belongsTo(models.User, {
        as: "user",
        foreignKey: {
          name: "userId",
        },
      });
      // Journey.hasOne(models.Bookmark);
    }
  }
  Journey.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      desc: DataTypes.STRING,
      jnImg: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Journey",
    }
  );
  return Journey;
};
