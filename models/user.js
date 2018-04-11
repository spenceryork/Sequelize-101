'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING
  }, { timestamps: false, tableName: "users" });
  User.associate = function(models) {
    User.belongsToMany(models.Show, {
      through: "users_favorites",
      as: "Favorites"
    });
  };
  return User;
};