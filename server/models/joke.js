'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Joke extends Model {
    static associate(models) {
      Joke.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
    }
  }
  Joke.init({
    userId: DataTypes.INTEGER,
    catagory: DataTypes.STRING,
    joke: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Joke',
  });
  return Joke;
};