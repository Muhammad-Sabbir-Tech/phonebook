'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty:true
      }
    },
    address: {
      type: DataTypes.STRING
    },
    postal_code: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty:true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notNull: true,
        notEmpty:true,
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:true,
        notEmpty:true,
      }
    },
    account_status: {
      type: DataTypes.STRING,
      allowNull: false,
      comment:"1=active, 0=pending",
      defaultValue:"1",
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};