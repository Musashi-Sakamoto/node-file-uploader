

module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  image.associate = function (models) {
    // associations can be defined here
    models.image.belongsTo(models.user, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });
  };
  return image;
};
