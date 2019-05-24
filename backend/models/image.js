

module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    key: DataTypes.STRING,
    post_id: DataTypes.INTEGER
  }, {});
  image.associate = function (models) {
    // associations can be defined here
    models.image.belongsTo(models.post, {
      foreignKey: 'post_id',
      targetKey: 'id'
    });
  };
  return image;
};
