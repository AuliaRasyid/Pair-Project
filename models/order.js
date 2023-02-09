'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
      Order.belongsTo(models.Store)
      Order.hasMany(models.OrderItem)
      Order.belongsToMany(models.Product, { through: models.OrderItem, foreignKey: 'OrderId' })
    }
  }
  Order.init({
    date: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    orderNumber: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    StoreId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};