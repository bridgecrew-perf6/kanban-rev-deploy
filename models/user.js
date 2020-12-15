'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require("../helpers/hash")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "name must be entered"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "email has been used, select another email"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "email must be entered"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "password must be entered"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        instance.password = hashPass(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};