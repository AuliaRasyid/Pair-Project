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
      Store.belongsTo(models.User)
      Store.belongsToMany(models.OrderItem, { through: models.Product});
    }
  }
  Store.init({
    name: DataTypes.STRING,
    emailStore: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};