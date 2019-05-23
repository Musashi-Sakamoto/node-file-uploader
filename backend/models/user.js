
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
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

    models.user.hasOne(models.verificationToken, {
      foreignKey: 'user_id',
      foreignKeyConstraint: true
    });
  };
  return user;
};
