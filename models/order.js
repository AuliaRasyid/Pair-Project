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


    get statusOrder() {
      if (this.status == true) {
        return 'Berhasil'
      } else {
        return "Menunggu"
      }
    }
    
  }
  Order.init({
    date: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    orderNumber: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    StoreId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });

  Order.beforeCreate((order) => {
    order.orderNumber = `${Math.random()}-${order.date.getFullYear()}`
  })

  return Order;
};