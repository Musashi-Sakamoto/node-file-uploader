
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    // associations can be defined here
    models.user.hasMany(models.image, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });

    models.user.hasMany(models.post, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });
  };
  return user;
};
