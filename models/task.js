'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)
      Task.belongsTo(models.Category)
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "title is required"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    // hooks: {
    //   beforeCreate(instance, option) {
    //     if (!instance.CategoryId) {
    //       instance.CategoryId = 1
    //     }
    //   }
    // },
    sequelize,
    modelName: 'Task',
  });
  return Task;
};