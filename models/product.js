'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.OrderItem)
      Product.belongsTo(models.Store)
      Product.belongsToMany(models.Order, { through: models.OrderItem, foreignKey: 'ProductId' })
    }

    static categoryProduct = ["Lokal", "International"]
    
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name Product cannot Null'
        },
        notEmpty: {
          msg: 'Name Product cannot Empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Stock Product cannot Null'
        },
        notEmpty: {
          msg: 'Stock Product cannot Empty'
        },
        min: {
          args: 1,
          msg : 'Stock Minimal satu'
        }
      }
    },
    category: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Category cannot Null'
        },
        notEmpty: {
          msg: 'Category cannot Empty'
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Price cannot Null'
        },
        notEmpty: {
          msg: 'Price cannot Empty'
        }
      }
    },
    size: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Size cannot Null'
        },
        notEmpty: {
          msg: 'Size cannot Empty'
        }
      }
    },
    image: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Image cannot Null'
        },
        notEmpty: {
          msg: 'Image cannot Empty'
        }
      }
    },
    StoreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};