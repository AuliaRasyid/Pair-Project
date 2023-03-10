'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserDetail)
      User.hasOne(models.Store)
      User.hasMany(models.Order)
    }
  }
  User.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(instance,option){
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(instance.password, salt)
       
       instance.password = hash
        }
       },
    sequelize,
    modelName: 'User',
  });
  return User;
};