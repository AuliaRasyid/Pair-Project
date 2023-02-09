'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.hasMany(models.Order)
      Store.hasMany(models.Product)
      Store.belongsTo(models.User)
    }
  }
  Store.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name Store cannot Null'
        },
        notEmpty: {
          msg: 'Name Store cannot Empty'
        }
      }
    },
    emailStore: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email Store cannot Null'
        },
        notEmpty: {
          msg: 'Email Store cannot Empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User Store cannot Null'
        },
        notEmpty: {
          msg: 'User Store cannot Empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};