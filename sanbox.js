/**{
 * hooks:{
 * beforeCreate(instance,option){
 *  const salt = bcrypt.genSaltSync(8)
 *  const hash = bcrypt.hashSync(instance.password, salt)
 * 
 * instance.password = hash
 *  }
 * },
 * sequelize,
 * modelName: 'User'
 * });
 * 
 * 
 */