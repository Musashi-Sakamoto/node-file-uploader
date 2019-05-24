

module.exports = (sequelize, DataTypes) => {
  const verificationToken = sequelize.define('verificationToken', {
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  verificationToken.associate = function (models) {
    // associations can be defined here
    models.verificationToken.belongsTo(models.user, {
      foreignKey: 'user_id',
      foreignKeyConstraint: true
    });
  };
  return verificationToken;
};
